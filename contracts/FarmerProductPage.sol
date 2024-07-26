// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/Farmer.sol";

contract FarmerProductPage {
    // Define the struct for a CocoaProduct
    struct CocoaProduct {
        address farmer;
        string location;
        uint256 quantity;
        uint256 price;
        uint256 date;
    }

    // Array to store all cocoa products
    CocoaProduct[] public cocoaProducts;

    // Farmer registry contract instance
    FarmerRegistry public farmerRegistry;

    // Constructor to initialize the farmer registry
    constructor(address _farmerRegistryAddress) {
        farmerRegistry = FarmerRegistry(_farmerRegistryAddress);
    }

    // Modifier to check if the sender is a registered farmer
    modifier onlyRegisteredFarmer() {
        require(
            farmerRegistry.isFarmerRegistered(msg.sender),
            "Farmer is not registered"
        );
        _;
    }

    // Function to add a new product
    function addProduct(
        string memory _location,
        uint256 _quantity,
        uint256 _price,
        uint256 _date
    ) public onlyRegisteredFarmer {
        // Create a new CocoaProduct instance
        CocoaProduct memory product = CocoaProduct(
            msg.sender,
            _location,
            _quantity,
            _price,
            _date
        );

        // Add the product to the array
        cocoaProducts.push(product);
    }

    // Function to get all products for the current farmer
    function getProducts() public view returns (CocoaProduct[] memory) {
        // Initialize an empty array to store the products
        CocoaProduct[] memory products = new CocoaProduct[](
            cocoaProducts.length
        );

        // Initialize a counter to keep track of the number of products
        uint256 count = 0;

        // Iterate over all products
        for (uint256 i = 0; i < cocoaProducts.length; i++) {
            // Check if the product belongs to the current farmer
            if (cocoaProducts[i].farmer == msg.sender) {
                // Add the product to the array
                products[count] = cocoaProducts[i];
                count++;
            }
        }

        // Resize the array to the correct length
        assembly {
            mstore(products, count)
        }

        // Return the array of products
        return products;
    }
}
