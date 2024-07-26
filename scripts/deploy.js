const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const Farmer = await hre.ethers.getContractFactory("FarmerRegistry")
  const LBC = await hre.ethers.getContractFactory("LBCRegistry")
  const FarmerProductPage = await hre.ethers.getContractFactory("LBCRegistry")
  const tracking = await Tracking.deploy();
  const farmer = await Farmer.deploy();
  const lbc = await LBC.deploy();
  const farmerProductPage = await FarmerProductPage.deploy();
  await tracking.deployed();
  await farmer.deployed();
  await lbc.deployed();
  await farmerProductPage.deployed();

  console.log(`Tracking deployed to ${tracking.address}`);
  console.log(`Farmer deployed to ${farmer.address}`)
  console.log(`LBC deployed to ${lbc.address}`)
  console.log(`FarmerProduct deployed to ${farmerProductPage.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
