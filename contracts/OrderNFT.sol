// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract OrderNFT is ERC721 {
    // Keep track of orderIds.
    using Counters for Counters.Counter;

    Counters.Counter private _orderIds;

    enum Status {
        ManufacturerShipped,
        DistributorReceived,
        DistributorForwarded,
        DistributorDecline,
        CustomerReject,
        CustomerComplete,
        CustomerReturn
    }

    struct Order {
        uint256 orderId;
        Status status;
        address currentOwner;
    }

    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => Order) private _orders;
    mapping(address => mapping(uint256 => bool)) private partyToOrderExists;

    constructor() payable ERC721("Order", "ORD") {
        console.log("This is Order NFT contract");
    }

    function createOrder(string memory  _uri, address[] memory addresses) public {
        // Consider there are only 3 parties: Manufacture, Distributor, Customer
        require(addresses.length == 3, "Number of parties must be 3");

        // Get the current tokenId, this starts at 0.
        uint256 newOrderId = _orderIds.current();

        // Create new order struct
        Order memory newOrder = Order(newOrderId, Status.ManufacturerShipped, msg.sender);

        // Save parties that involves in the transaction
        for (uint256 i = 0; i < addresses.length; i++) {
            partyToOrderExists[addresses[i]][newOrderId] = true;
        }

        // Save new order into mapping
        _orders[newOrderId] = newOrder;

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newOrderId);

        // Set the orderURI
        _setTokenURI(newOrderId, _uri);

        // Increment the counter for when the next NFT is minted.
        _orderIds.increment();
    }

    function getMyOrders() public view returns (Order[] memory) {
        uint256 totalOrderCount = _orderIds.current();
        uint256 orderCount = 0;
        uint256 currentIndex = 0;

        // Count all orders
        for (uint256 i = 0; i < totalOrderCount; i++) {
            if (partyToOrderExists[msg.sender][i]) {
                orderCount += 1;
            }
        }

        // Create order array with specify size
        Order[] memory orders = new Order[](orderCount);

        // Get all order inside the array
        for (uint256 i = 0; i < totalOrderCount; i++) {
            if (partyToOrderExists[msg.sender][i]) {
                orders[currentIndex] = _orders[i];
                currentIndex += 1;
            }
        }

        return orders;
    }

    function transferOwner(uint256 orderId, address to, Status _status) public {
        _orders[orderId].status = _status;
        _transfer(_orders[orderId].currentOwner, to, orderId);
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

        return _tokenURIs[_tokenId];

    }

}
