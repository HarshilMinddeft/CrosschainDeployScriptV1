// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Fetch the contract factories
  const SquidRouter = await hre.ethers.getContractFactory("SquidRouter");

  // Specify the constructor arguments
  const gatewayAddress = "0xC249632c2D40b9001FE907806902f63038B737Ab";
  const gasServiceAddress = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
  const forecallGasServiceAddress ="0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
  const multicallAddress = "0xbf56651C0C6fb09b9A3Ba2496c5385A1A6E86C5D";

  // Deploy the contract
  const squidRouter = await SquidRouter.deploy(
    gatewayAddress,
    gasServiceAddress,
    forecallGasServiceAddress,
    multicallAddress
);

  await squidRouter.deployed();
  console.log("SquidRouter deployed to=>:", squidRouter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
