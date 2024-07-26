// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lbc.sol";

contract LBCProductPage {
    struct CocoaProduct {
        address LBC;
        address farmer;
        string location;
        uint256 quantity;
        uint256 price;
        uint256 date;
    }

    CocoaProduct[] public cocoaProducts;
    LBCRegistry public LbcRegistry;

    // Correct constructor to instantiate LBCRegistry
    constructor(address _LBCRegistryAddress) {
        LbcRegistry = LBCRegistry(_LBCRegistryAddress);
    }

    modifier onlyRegisteredLBC() {
        require(
            LbcRegistry.isLBCRegistered(msg.sender),
            "LBC is not registered"
        );
        _;
    }

    function addProduct(
        string memory _location,
        address _farmerAddress,
        uint256 _quantity,
        uint256 _price,
        uint256 _date
    ) public onlyRegisteredLBC {
        CocoaProduct memory product = CocoaProduct(
            msg.sender,
            _farmerAddress,
            _location,
            _quantity,
            _price,
            _date
        );

        cocoaProducts.push(product);
    }

    function getProducts() public view returns (CocoaProduct[] memory) {
        CocoaProduct[] memory products = new CocoaProduct[](cocoaProducts.length);
        uint256 count = 0;

        for (uint256 i = 0; i < cocoaProducts.length; i++) {
            if (cocoaProducts[i].farmer == msg.sender) {
                products[count] = cocoaProducts[i];
                count++;
            }
        }

        assembly {
            mstore(products, count)
        }

        return products;
    }
}
