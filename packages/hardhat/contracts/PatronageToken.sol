// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PatronageToken is ERC721, Ownable {
    constructor() ERC721("Radicalize.art Patronage Token", "PATRONAGE") {
        _setBaseURI("https://ipfs.io/ipfs/");
    }

    function mint(address to, uint256 tokenId, string memory tokenURI) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
