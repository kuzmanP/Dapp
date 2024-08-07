const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const Farmer = await hre.ethers.getContractFactory("FarmerRegistry")
  const LBC = await hre.ethers.getContractFactory("LBCRegistry")
  const FarmerProductPage = await hre.ethers.getContractFactory("FarmerRegistry")
  const LBCProductPage = await hre.ethers.getContractFactory("LBCProductPage")
  const QCCProductPage = await hre.ethers.getContractFactory("QCCProductPage")

  const tracking = await Tracking.deploy();
  const farmer = await Farmer.deploy();
  const lbc = await LBC.deploy();
  const farmerProductPage = await FarmerProductPage.deploy();
  const lbcProductPage = await LBCProductPage.deploy(lbc.address);
  const qccProductPage = await QCCProductPage.deploy(tracking.address);

  await tracking.deployed();
  await farmer.deployed();
  await lbc.deployed();
  await farmerProductPage.deployed();
  await lbcProductPage.deployed();
  await qccProductPage.deployed();

  console.log(`Tracking deployed to ${tracking.address}`);
  console.log(`Farmer deployed to ${farmer.address}`)
  console.log(`LBC deployed to ${lbc.address}`)
  console.log(`FarmerProduct deployed to ${farmerProductPage.address}`)
  console.log(`LBC Product deployed to ${lbcProductPage.address}`)
  console.log(`QCC Product deployed to ${qccProductPage.address}`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
