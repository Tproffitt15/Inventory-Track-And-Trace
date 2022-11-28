// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract OrderNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
    // Keep track of orderIds.
    using Counters for Counters.Counter;
    Counters.Counter private _orderIds;

    constructor() payable ERC721("OrderNFT", "REAL") {
        console.log("This is Order NFT contract");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function createOrder(string memory _uri) public {
        // Get the current tokenId, this starts at 0.
        uint256 newOrderId = _orderIds.current();

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newOrderId);

        // Increment the counter for when the next NFT is minted.
        _orderIds.increment();

        // Set the orderURI
        _setTokenURI(newOrderId, _uri);
    }

    // Set the NFT's metadata
    function tokenURI(uint256 _orderId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(
            _exists(_orderId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return "Order";
    }
}
