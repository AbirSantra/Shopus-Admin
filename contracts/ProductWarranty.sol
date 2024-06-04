// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductWarranty {
    // Struct to store warranty information
    struct Warranty {
        string orderId;
        string storeId;
        string customerId;
        string customerName;
        string orderedAt;
        string productId;
        string productName;
        string price;
    }

    // Mapping to store warranties by their IDs
    mapping(uint256 => Warranty) public warranties;

    // Counter to generate unique warranty IDs
    uint256 public nextWarrantyId;

    // Event to notify when a new warranty is minted
    event WarrantyMinted(
        uint256 id,
        string orderId,
        string storeId,
        string customerId,
        string customerName,
        string orderedAt,
        string productId,
        string productName,
        string price
    );

    // Function to mint a new warranty
    function mintWarranty(
        string memory _orderId,
        string memory _storeId,
        string memory _customerId,
        string memory _customerName,
        string memory _orderedAt,
        string memory _productId,
        string memory _productName,
        string memory _price
    ) public {
        uint256 id = nextWarrantyId++;
        warranties[id] = Warranty(
            _orderId,
            _storeId,
            _customerId,
            _customerName,
            _orderedAt,
            _productId,
            _productName,
            _price
        );
        emit WarrantyMinted(
            id,
            _orderId,
            _storeId,
            _customerId,
            _customerName,
            _orderedAt,
            _productId,
            _productName,
            _price
        );
    }

    // Function to retrieve a warranty by its ID
    function getWarranty(uint256 _id) public view returns (Warranty memory) {
        return warranties[_id];
    }
}