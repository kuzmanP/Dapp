pragma solidity ^0.8.0;

contract CocoaFarmers {
    struct Farmer {
        string name;
        address farmerAddress;
        string location;
        uint256 cocoaYield;
        uint256 dateCreated;
    }

    mapping(address => Farmer) public farmers;
    address[] public farmerAddresses;
    string[] public farmerNames;
    mapping(string => address) public nameToAddress;
    mapping(address => string) public addressToName;

    event FarmerRegistered(address indexed farmerAddress, string name);

    constructor() public {
        // Initialize the contract with an empty state
    }

    function registerFarmer(
        address _farmerAddress,
        string memory _name,
        string memory _location,
        uint256 _yield
    ) public {
        require(
            farmers[_farmerAddress].farmerAddress == address(0),
            "Farmer already registered"
        );

        Farmer memory farmer = Farmer({
            farmerAddress: _farmerAddress,
            name: _name,
            location: _location,
            cocoaYield: _yield,
            dateCreated: block.timestamp
        });

        farmers[_farmerAddress] = farmer;
        farmerAddresses.push(_farmerAddress);
        farmerNames.push(_name);
        nameToAddress[_name] = _farmerAddress;
        addressToName[_farmerAddress] = _name;

        tyepFarmers.push(
            TyepFarmer(
                _farmerAddress,
                _name,
                _location,
                _yield,
                block.timestamp
            )
        );

        emit FarmerCreated(_farmerAddress, _name, _location, _yield);
    }

    function getFarmer(
        address _farmerAddress
    )
        public
        view
        returns (
            string memory name,
            string memory location,
            uint256 cocoaYield,
            uint256 dateCreated
        )
    {
        Farmer storage farmer = farmers[_farmerAddress];
        require(farmer.farmerAddress != address(0), "Farmer not registered");

        return (
            farmer.name,
            farmer.location,
            farmer.cocoaYield,
            farmer.dateCreated
        );
    }

    function updateCocoaYield(
        address _farmerAddress,
        uint256 _newYield
    ) public {
        require(
            farmers[_farmerAddress].farmerAddress != address(0),
            "Farmer not registered"
        );

        farmers[_farmerAddress].cocoaYield = _newYield;
    }

    function updateLocation(
        address _farmerAddress,
        string memory _newLocation
    ) public {
        require(
            farmers[_farmerAddress].farmerAddress != address(0),
            "Farmer not registered"
        );

        farmers[_farmerAddress].location = _newLocation;
    }

    function getAllFarmers()
        public
        view
        returns (address[] memory, string[] memory)
    {
        return (farmerAddresses, farmerNames);
    }
}
