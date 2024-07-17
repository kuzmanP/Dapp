// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmerRegistry {
    struct Farmer {
        string name;
        string location;
        uint256 yield;
        uint256 dateCreated;
    }

    mapping(address => Farmer[]) public farmers;
    uint256 public farmerCount;

    event FarmerCreated(
        string _name,
        string _location,
        uint256 _yield,
        uint256 _dateCreated
    );

    Farmer[] public typeFarmers;

    function registerFarmer(
        string memory _name,
        string memory _location,
        uint256 _yield,
        uint256 _dateCreated
    ) public {
        Farmer memory farmer = Farmer(
            
            _name,
            _location,
            _yield,
            _dateCreated
        );

        farmers[msg.sender].push(farmer);
        farmerCount++;

        typeFarmers.push(
            Farmer( _name, _location, _yield, _dateCreated)
        );

        emit FarmerCreated(
            _name,
            _location,
            _yield,
            _dateCreated
        );
    }
}