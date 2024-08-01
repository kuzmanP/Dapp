// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QCCProductPage {
    // Define the struct for a CocoaQuality
    struct CocoaQuality {
        address QCC;
        uint256 batch_id;
        string bean_quality;
        string moisture_level;
        string origin;
        uint256 inspection_date;
    }

    // Array to store all cocoa qualities
    CocoaQuality[] public cocoaQualities;

    // Address of the assigned QCC
    address public assignedQCC;

    // Constructor to initialize the assigned QCC
    constructor(address _assignedQCC) {
        assignedQCC = _assignedQCC;
    }

    // Modifier to check if the sender is the assigned QCC
    modifier onlyAssignedQCC() {
        require(
            msg.sender == assignedQCC,
            "Only the assigned QCC can call this function"
        );
        _;
    }

    // Function to add a new cocoa quality
    function addCocoaQuality(
        uint256 _batch_id,
        string memory _bean_quality,
        string memory _moisture_level,
        string memory _origin,
        uint256 _inspection_date
    ) public onlyAssignedQCC {
        // Create a new CocoaQuality instance
        CocoaQuality memory quality = CocoaQuality(
            msg.sender,
            _batch_id,
            _bean_quality,
            _moisture_level,
            _origin,
            _inspection_date
        );

        // Add the quality to the array
        cocoaQualities.push(quality);
    }

    function getCocoaQualities() public view returns (CocoaQuality[] memory) {
        CocoaQuality[] memory qualities = new CocoaQuality[](
            cocoaQualities.length
        );
        uint256 count = 0;

        for (uint256 i = 0; i < cocoaQualities.length; i++) {
            if (cocoaQualities[i].QCC == msg.sender) {
                qualities[count] = cocoaQualities[i];
                count++;
            }
        }

        assembly {
            mstore(qualities, count)
        }

        return qualities;
    }
}
