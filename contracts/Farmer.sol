// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmerRegistry {
    struct Farmer {
        address owner;
        string name;
        string location;
        uint256 yield;
        uint256 dateCreated;
        uint256 rating;
    }

    mapping (address => Farmer[]) public farmers;
    uint256 public farmerCount;

    event FarmerCreated(
        address indexed _owner,
        string _name,
        string _location,
        uint256 _yield,
        uint256 _dateCreated,
        uint256 _rating
    );

    Farmer[] public typeFarmers;

    function registerFarmer(
        string memory _name,
        string memory _location,
        uint256 _yield,
        uint256 _dateCreated
    ) public payable {
        require(msg.value == _yield, "Payment amount must match the price.");

        Farmer memory farmer = Farmer(
            msg.sender,
            _name,
            _location,
            _yield,
            _dateCreated,
            0
        );

        farmers[msg.sender].push(farmer);
        farmerCount++;

        typeFarmers.push(
            Farmer(
                msg.sender,
                _name,
                _location,
                _yield,
                _dateCreated,
                0
            )
        );

        emit FarmerCreated(msg.sender, _name, _location, _yield, _dateCreated, 0);
    }
}