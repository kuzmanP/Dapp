const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const Farmer = await hre.ethers.getContractFactory("FarmerRegistry")
  const tracking = await Tracking.deploy();
  const farmer = await Farmer.deploy();

  await tracking.deployed();
  await farmer.deployed();

  console.log(`Tracking deployed to ${tracking.address}`);
  console.log(`Farmer deployed to ${farmer.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
