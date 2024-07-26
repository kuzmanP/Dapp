// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LBCRegistry {
    struct LBC {
        string name;
        string location;
        uint256 dateCreated;
    }

    mapping(address => bool) public registeredLBC;

    mapping(address => LBC[]) public lbcs;
    uint256 public lbcsCount;

    event LBCCreated(string _name, string _location, uint256 _dateCreated);

    LBC[] public typeLBC;

    function isLBCRegistered(address _lbcs) public view returns (bool) {
        return registeredLBC[_lbcs];
    }

    function registerLBC(
        string memory _name,
        string memory _location,
        uint256 _dateCreated
    ) public {
        LBC memory lbc = LBC(_name, _location, _dateCreated);

        lbcs[msg.sender].push(lbc);
        lbcsCount++;

        typeLBC.push(LBC(_name, _location, _dateCreated));

        emit LBCCreated(_name, _location, _dateCreated);
    }
}
