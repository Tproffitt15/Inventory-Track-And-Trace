// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract OrderNFT is ERC721 {
    // Keep track of orderIds.
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _orderIds;

    mapping(uint256 => string) private _tokenURIs;

    constructor() payable ERC721("OrderNFT", "REAL") {
        console.log("This is Order NFT contract");
    }

    function createOrder(string memory _uri) public {
        // Get the current tokenId, this starts at 0.
        uint256 newOrderId = _orderIds.current();

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newOrderId);

        // Set the orderURI
        _setTokenURI(newOrderId, _uri);

        // Increment the counter for when the next NFT is minted.
        _orderIds.increment();
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    // Set the NFT's metadata
    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory _tokenURI = _tokenURIs[_tokenId];

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    _tokenURI
                )
            );
        // return _tokenURIs[_tokenId];

        // string memory _tokenURI = _tokenURIs[_tokenId];
        // string memory base = _baseURI();

        // // If there is no base URI, return the token URI.
        // if (bytes(base).length == 0) {
        //     return _tokenURI;
        // }
        // // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        // if (bytes(_tokenURI).length > 0) {
        //     return string(abi.encodePacked(base, _tokenURI));
        // }
        // // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        // return string(abi.encodePacked(base, _tokenId.toString()));
    }
}
