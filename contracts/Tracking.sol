// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    enum ShipmentStatus {
        PENDING,
        IN_TRANSIT,
        DELIVERED
    }

    //Farmer
    struct Farmer {
        address owner;
        string name;
        string location;
        uint256 yield;
        uint256 dateCreated;
        uint256 rating;
    }

    mapping(address => Farmer[]) public farmers;
    uint256 public farmerCount;

    event FarmerCreated(
        address indexed _owner,
        string _name,
        string _location,
        uint256 _yield,
        uint256 _dateCreated,
        uint256 _rating
    );

    struct TyepFarmer {
        address owner;
        string name;
        string location;
        uint256 yield;
        uint256 dateCreated;
        uint256 rating;
    }

    TyepFarmer[] public tyepFarmers;

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

        tyepFarmers.push(
            TyepFarmer(msg.sender, _name, _location, _yield, _dateCreated, 0)
        );

        emit FarmerCreated(
            msg.sender,
            _name,
            _location,
            _yield,
            _dateCreated,
            0
        );
    }
    struct Shipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 quantity;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
        string locationType;
    }

    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

    struct TyepShipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 quantity;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
        string locationType;
    }

    TyepShipment[] tyepShipments;

    event ShipmentCreated(
        address indexed sender,
        address indexed receiver,
        uint256 pickupTime,
        uint256 quantity,
        uint256 price,
        string locationType
    );
    event ShipmentInTransit(
        address indexed sender,
        address indexed receiver,
        uint256 pickupTime
    );
    event ShipmentDelivered(
        address indexed sender,
        address indexed receiver,
        uint256 deliveryTime
    );
    event ShipmentPaid(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(
        address _receiver,
        uint256 _pickupTime,
        uint256 _quantity,
        uint256 _price,
        string memory _locationType
    ) public payable {
        require(msg.value == _price, "Payment amount must match the price.");

        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            _pickupTime,
            0,
            _quantity,
            _price,
            ShipmentStatus.PENDING,
            false,
            _locationType
        );

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        tyepShipments.push(
            TyepShipment(
                msg.sender,
                _receiver,
                _pickupTime,
                0,
                _quantity,
                _price,
                ShipmentStatus.PENDING,
                false,
                _locationType
            )
        );

        emit ShipmentCreated(
            msg.sender,
            _receiver,
            _pickupTime,
            _quantity,
            _price,
            _locationType
        );
    }

    function startShipment(
        address _sender,
        address _receiver,
        uint256 _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver.");
        require(
            shipment.status == ShipmentStatus.PENDING,
            "Shipment already in transit."
        );

        shipment.status = ShipmentStatus.IN_TRANSIT;
        tyepShipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    function completeShipment(
        address _sender,
        address _receiver,
        uint256 _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TyepShipment storage tyepShipment = tyepShipments[_index];

        require(shipment.receiver == _receiver, "Invalid receiver.");
        require(
            shipment.status == ShipmentStatus.IN_TRANSIT,
            "Shipment not in transit."
        );
        require(!shipment.isPaid, "Shipment already paid.");

        shipment.status = ShipmentStatus.DELIVERED;
        tyepShipment.status = ShipmentStatus.DELIVERED;
        tyepShipment.deliveryTime = block.timestamp;
        shipment.deliveryTime = block.timestamp;

        uint256 amount = shipment.price;

        payable(shipment.receiver).transfer(amount);

        shipment.isPaid = true;
        tyepShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    function getShipment(
        address _sender,
        uint256 _index
    )
        public
        view
        returns (
            address,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            ShipmentStatus,
            bool
        )
    {
        Shipment memory shipment = shipments[_sender][_index];
        return (
            shipment.sender,
            shipment.receiver,
            shipment.pickupTime,
            shipment.deliveryTime,
            shipment.quantity,
            shipment.price,
            shipment.status,
            shipment.isPaid
        );
    }

    function getShipmentsCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }

    function getAllTransactions() public view returns (TyepShipment[] memory) {
        return tyepShipments;
    }
}
