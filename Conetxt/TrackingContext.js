import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
//import mongoose from 'mongoose';
//const Shipment = require("../models/shipment"); // Adjust the path as necessary
const { connectDB } = require('../db');
async function main() {
  try {
    await connectDB();
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

main();


import axios, { Axios } from 'axios';

//INTERNAL IMPORT
import tracking from "../Conetxt/Tracking.json";
import farmer from "../Conetxt/FarmerRegistry.json"
//HARDHAT ADDRESS
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const FarmerContractAddress = "0xe7f1725E7734CE288F8367e1Bb";
//POLYGON ADDRESS
// const ContractAddress = "0xbeEed8435ee819851f443Ae302E9A1c138e3C24c";
const ContractABI = tracking.abi;
const FarmerContractABI = farmer.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);


const fetchFarmerContract = (signerOrProvider) =>
  new ethers.Contract(FarmerContractAddress, FarmerContractABI, signerOrProvider);

//NETWORK----

//NETWORK
const networks = {
  // polygon_amoy: {
  //   chainId: `0x${Number(80002).toString(16)}`,
  //   chainName: "Polygon Amoy",
  //   nativeCurrency: {
  //     name: "MATIC",
  //     symbol: "MATIC",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://rpc-amoy.polygon.technology/"],
  //   blockExplorerUrls: ["https://www.oklink.com/amoy"],
  // },
  // polygon_mumbai: {
  //   chainId: `0x${Number(80001).toString(16)}`,
  //   chainName: "Polygon Mumbai",
  //   nativeCurrency: {
  //     name: "MATIC",
  //     symbol: "MATIC",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
  //   blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  // },
  // polygon: {
  //   chainId: `0x${Number(137).toString(16)}`,
  //   chainName: "Polygon Mainnet",
  //   nativeCurrency: {
  //     name: "MATIC",
  //     symbol: "MATIC",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://rpc.ankr.com/polygon"],
  //   blockExplorerUrls: ["https://polygonscan.com/"],
  // },
  // bsc: {
  //   chainId: `0x${Number(56).toString(16)}`,
  //   chainName: "Binance Smart Chain Mainnet",
  //   nativeCurrency: {
  //     name: "Binance Chain Native Token",
  //     symbol: "BNB",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://rpc.ankr.com/bsc"],
  //   blockExplorerUrls: ["https://bscscan.com"],
  // },
  // base_mainnet: {
  //   chainId: `0x${Number(8453).toString(16)}`,
  //   chainName: "Base Mainnet",
  //   nativeCurrency: {
  //     name: "ETH",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://mainnet.base.org/"],
  //   blockExplorerUrls: ["https://bscscan.com"],
  // },
  // base_sepolia: {
  //   chainId: `0x${Number(84532).toString(16)}`,
  //   chainName: "Base Sepolia",
  //   nativeCurrency: {
  //     name: "ETH",
  //     symbol: "ETH",
  //     decimals: 18,
  //   },
  //   rpcUrls: ["https://sepolia.base.org"],
  //   blockExplorerUrls: ["https://bscscan.com"],
  // },
  localhost: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "localhost",
    nativeCurrency: {
      name: "GO",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const handleNetworkSwitch = async () => {
  const networkName = "localhost";
  await changeNetwork({ networkName });
};
//END  OF NETWORK-------


export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  //STATE VARIABLE
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const transactionHashID = ethers.utils.id(contract.address + receiver + pickupTime);
      const Status = "Complete"
      const isPaid = true

      console.log(signer)
      console.log(provider)
      console.log(contract)
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
      await createItem.wait();
      console.log(createItem);

      const body = {
        receiver: receiver,
        pickupTime: pickupTime,
        distance: Number(distance),
        price: Number(price),
        transactionHash: transactionHashID,
        isPaid: isPaid,
        status: Status
      };
      try {
        console.log("Hi")
        const { data } = await axios.post("/api/shipments", body)
        console.log("Hello")
        console.log(data);
      } catch (error) {
        console.log(error)
      }

      //getallShipmentDB()

      location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
    }


  };

  //Farmer
  const registerFarmer = async (items) => {
    console.log(items);
    const { name, dateCreated, location, cocoaYield } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchFarmerContract(signer);
      const farmerAddress = ethers.utils.id(contract.address);
      console.log(signer)
      console.log(provider)
      console.log(contract)
      const createItem = await contract.registerFarmer(
        name,
        farmerAddress,
        cocoaYield,
        new Date(dateCreated).getTime(),
        location
      );

      await createItem.wait();
      console.log(createItem);

      const body = {
        Name: name,
        Date_Created: dateCreated,
        location: location,
        address: farmerAddress,
        cocoaYield: cocoaYield
      };
      try {
        console.log("Hi")
        const { data } = await axios.post("/api/farmers", body)
        console.log("Hello")
        console.log(data);
      } catch (error) {
        console.log(error)
      }

      //getallShipmentDB()

      location.reload();
    } catch (error) {
      console.log("Something went wrong Farmer", error);
    }


  };


  const getallShipmentDB = async () => {
    try {
      console.log("Hi")
      const { data } = await axios.get("/api/shipments")
      return data;
    } catch (error) {
      console.log(error)
    }
  };

  const getallFarmersDB = async () => {
    try {
      const { data } = await axios.get("/api/farmers")
      return data;
    } catch (error) {
      console.log(error)
    }
  };

  const getAllShipment = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = fetchContract(provider);

        const shipments = await contract.getAllTransactions();
        const allShipments = shipments.map((shipment) => ({
          sender: shipment.sender,
          receiver: shipment.receiver,
          price: ethers.utils.formatEther(shipment.price.toString()),
          pickupTime: shipment.pickupTime.toNumber(),
          deliveryTime: shipment.deliveryTime.toNumber(),
          distance: shipment.distance.toNumber(),
          isPaid: shipment.isPaid,
          status: shipment.status,
        }));
        console.log(allShipments)

        return allShipments;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider);
        const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
        return shipmentsCount.toNumber();
      }
    } catch (error) {
      console.log("Getting shipment");
    }
  };

  const completeShipment = async (completeShipment) => {
    const { recevier, index } = completeShipment;
    try {
      const address = await checkIfWalletConnected();
      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const transaction = await contract.completeShipment(
          address,
          recevier,
          index,
          {
            gasLimit: 300000,
          }
        );

        await transaction.wait();
        console.log(transaction);
        location.reload();
      }
    } catch (error) {
      console.log("Cannot complete Shipment", error);
    }
  };

  const getShipment = async (index) => {
    try {
      const address = await checkIfWalletConnected();

      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider);
        const shipment = await contract.getShipment(address, index * 1);

        const SingleShipment = {
          sender: shipment[0],
          receiver: shipment[1],
          pickupTime: shipment[2].toNumber(),
          deliveryTime: shipment[3].toNumber(),
          distance: shipment[4].toNumber(),
          price: ethers.utils.formatEther(shipment[5].toString()),
          status: shipment[6],
          isPaid: shipment[7],
        };

        return SingleShipment;
      }
    } catch (error) {
      console.log("Sorry no Shipment");
    }
  };

  const startShipment = async (getProduct) => {
    const { reveiver, index } = getProduct;

    try {
      const address = await checkIfWalletConnected();

      if (address) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const shipment = await contract.startShipment(
          address,
          reveiver,
          index * 1,
          {
            gasLimit: 300000,
          }
        );

        shipment.wait();
        console.log(shipment);
        location.reload();
      }
    } catch (error) {
      console.log("Sorry no Shipment", error);
    }
  };
  //---CHECK WALLET CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const network = await handleNetworkSwitch();
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
        return accounts[0];
      } else {
        return "No account";
      }
    } catch (error) {
      return "not connected";
    }
  };

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) { alert("Install MetaMask"); return };
      const network = await handleNetworkSwitch();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      alert("Something want wrong");
      return;
    }
  };

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        getallShipmentDB,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        registerFarmer,
        getallFarmersDB,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
