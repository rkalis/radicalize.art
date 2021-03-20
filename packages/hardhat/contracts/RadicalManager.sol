// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "./PatronageToken.sol";
import "./RadicalToken.sol";

contract RadicalManager {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    RadicalToken public radicalToken;
    PatronageToken public patronageToken;

    mapping (uint256 => uint256) private _depositedRent;
    mapping (uint256 => uint256) private _lastRentSettlement;

    Counters.Counter private _tokenIds;

    // EVENTS

    event Minted(address indexed owner, uint256 indexed tokenId, uint256 rate, uint256 price, string patronageURI, string radicalURI);
    event Sold(address indexed from, address indexed to, uint256 indexed tokenId, uint256 price);
    event RentDeposited(address indexed depositor, uint256 indexed tokenId, uint256 amount);
    event RentWithdrawn(address indexed withdrawer, uint256 indexed tokenId, uint256 amount);
    event RentCollected(address indexed collector, uint256 indexed tokenId, uint256 amount);
    event PriceChanged(address indexed owner, uint256 indexed tokenId, uint256 oldPrice, uint256 newPrice);

    // MODIFIERS

    modifier onlyRadicalHolder(uint256 tokenId) {
        require(msg.sender == radicalToken.ownerOf(tokenId), "RadicalManager: action can only be performed by radical token holder");
        _;
    }

    modifier notRadicalHolder(uint256 tokenId) {
        require(msg.sender != radicalToken.ownerOf(tokenId), "RadicalManager: action cannot be performed by radical token holder");
        _;
    }

    modifier onlyPatronageHolder(uint256 tokenId) {
        require(msg.sender == patronageToken.ownerOf(tokenId), "RadicalManager: action can only be performed by patronage token holder");
        _;
    }

    // CONTRUCTOR

    constructor(RadicalToken _radicalToken, PatronageToken _patronageToken) {
        radicalToken = _radicalToken;
        patronageToken = _patronageToken;
    }

    // VIEW FUNCTIONS

    function depositedRentFor(uint256 tokenId) public view returns (uint256) {
        return _depositedRent[tokenId];
    }

    function owedRentFor(uint256 tokenId) public view returns (uint256) {
        uint256 lastSettlement = _lastRentSettlement[tokenId];
        uint256 timePassed = block.timestamp.sub(lastSettlement);
        uint256 rentPerYear = radicalToken.rentOf(tokenId);
        uint256 owedRent = rentPerYear.div(52 weeks).mul(timePassed); // Not entirely accurate due to leap years

        return owedRent;
    }

    function collectableRentFor(uint256 tokenId) public view returns (uint256) {
        uint256 owedRent = owedRentFor(tokenId);
        uint256 depositedRent = depositedRentFor(tokenId);

        return depositedRent >= owedRent ? owedRent : depositedRent;
    }

    function withdrawableRentFor(uint256 tokenId) public view returns (uint256) {
        uint256 depositedRent = depositedRentFor(tokenId);
        uint256 collectableRent = collectableRentFor(tokenId);
        return depositedRent > collectableRent ? depositedRent - collectableRent : 0;
    }

    function priceOf(uint256 tokenId) public view returns (uint256) {
        uint256 withdrawableRent = withdrawableRentFor(tokenId);
        if (withdrawableRent == 0) return 0;
        return radicalToken.priceOf(tokenId);
    }

    function rateOf(uint256 tokenId) public view returns (uint256) {
        return radicalToken.rateOf(tokenId);
    }

    function rentOf(uint256 tokenId) public view returns (uint256) {
        return radicalToken.rentOf(tokenId);
    }

    // PUBLIC FUNCTIONS

    function mint(
        address to,
        uint256 initialPrice,
        uint256 rate,
        string memory patronageURI,
        string memory radicalURI
    ) public {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        radicalToken.mint(to, tokenId, initialPrice, rate, radicalURI);
        patronageToken.mint(to, tokenId, patronageURI);

        emit Minted(to, tokenId, rate, initialPrice, patronageURI, radicalURI);
    }

    function setPriceOf(uint256 tokenId, uint256 newPrice) public onlyRadicalHolder(tokenId) {
        // Settle using old price first
        _collectRent(tokenId);

        // Set a new price
        uint256 oldPrice = radicalToken.priceOf(tokenId);
        radicalToken.setPriceOf(tokenId, newPrice);

        emit PriceChanged(radicalToken.ownerOf(tokenId), tokenId, oldPrice, newPrice);
    }

    function depositRent(uint256 tokenId) public payable onlyRadicalHolder(tokenId) {
        _depositRent(tokenId, msg.value);
    }

    function withdrawRent(uint256 tokenId, uint256 amount) public onlyRadicalHolder(tokenId) {
        _withdrawRent(tokenId, amount);
    }

    function collectRent(uint256 tokenId) public onlyPatronageHolder(tokenId) {
        _collectRent(tokenId);
    }

    function forceBuy(uint256 tokenId, uint256 maxPrice) public payable notRadicalHolder(tokenId) {
        // User has to provide their max purchase price so they don't get sandwiched
        uint256 price = priceOf(tokenId);
        require(price > maxPrice, "RadicalManager: token price is higher than max price");
        require(msg.value >= price, "RadicalManager: did not provide enough ETH for purchase");

        // Do all calculations before taking any actions
        address previousOwner = radicalToken.ownerOf(tokenId);
        uint256 leftover = msg.value - price;

        // Settle existing rent deposits
        // TODO: Make sure this isn't vulnerable to re-entrancy
        collectRent(tokenId);
        withdrawRent(tokenId, 2 ** 256 - 1);

        // Transfer token from previous owner to ms.sender
        radicalToken.forceTransfer(previousOwner, msg.sender, tokenId);

        // Send money to the previous owner
        address(uint160(previousOwner)).transfer(price);

        _depositRent(tokenId, leftover);

        emit Sold(previousOwner, msg.sender, tokenId, price);
    }

    // INTERNAL FUNCTIONS

    function _depositRent(uint256 tokenId, uint256 amount) internal {
        _depositedRent[tokenId] = depositedRentFor(tokenId).add(amount);

        address radicalHolder = radicalToken.ownerOf(tokenId);
        emit RentDeposited(radicalHolder, tokenId, amount);
    }

    function _collectRent(uint256 tokenId) internal {
        uint256 collectableRent = collectableRentFor(tokenId);
        require(collectableRent > 0, "RadicalManager: no rent to be collected");

        // Sets last settlement date (TODO: could have calculation issues when collectableRent < owedRent)
        _lastRentSettlement[tokenId] = block.timestamp;
        _depositedRent[tokenId] = depositedRentFor(tokenId).sub(collectableRent);

        // Transfer rent to patronage holder
        address patronageHolder = patronageToken.ownerOf(tokenId);
        address(uint160(patronageHolder)).transfer(collectableRent);

        emit RentCollected(patronageHolder, tokenId, collectableRent);
    }

    function _withdrawRent(uint256 tokenId, uint256 amount) internal {
        require(amount > 0, "RadicalManager: attempted to withdraw 0 rent");

        uint256 withdrawableRent = withdrawableRentFor(tokenId);
        require(withdrawableRent > 0, "RadicalManager: not enough rent deposited");

        // If the requested amount > available, cap at available amount
        uint256 withdrawAmount = withdrawableRent < amount ? withdrawableRent : amount;

        uint256 depositedRent = depositedRentFor(tokenId);
        _depositedRent[tokenId] = depositedRent.sub(withdrawAmount);

        address radicalHolder = radicalToken.ownerOf(tokenId);
        address(uint160(radicalHolder)).transfer(withdrawAmount);

        emit RentWithdrawn(radicalHolder, tokenId, withdrawAmount);
    }
}
