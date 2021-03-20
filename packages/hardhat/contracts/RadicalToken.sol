// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract RadicalToken is ERC721, Ownable {
    using SafeMath for uint256;

    mapping (uint256 => uint256) private _tokenRate;
    mapping (uint256 => uint256) private _tokenPrice;

    modifier onlyExistingToken(uint256 tokenId) {
        require(_exists(tokenId), "RadicalToken: attempt to perform action on nonexistent token");
        _;
    }

    constructor() ERC721("Radicalize.art Radical Token", "RADICAL") {
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    function priceOf(uint256 tokenId) public view onlyExistingToken(tokenId) returns (uint256) {
        return _tokenPrice[tokenId];
    }

    function rateOf(uint256 tokenId) public view onlyExistingToken(tokenId) returns (uint256) {
        return _tokenRate[tokenId];
    }

    function rentOf(uint256 tokenId) public view onlyExistingToken(tokenId) returns (uint256) {
        return priceOf(tokenId).div(1000).mul(rateOf(tokenId));
    }

    function setPriceOf(uint256 tokenId, uint256 price) public onlyExistingToken(tokenId) onlyOwner {
        _tokenPrice[tokenId] = price;
    }

    // Mint new token with initial price and rate
    function mint(address to, uint256 tokenId, uint256 initialPrice, uint256 rate, string memory tokenURI) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _tokenPrice[tokenId] = initialPrice;
        _tokenRate[tokenId] = rate;
    }

    function forceTransfer(address from, address to, uint256 tokenId) public onlyOwner {
        _transfer(from, to, tokenId);
    }
}
