// const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("token");
  const token = await Token.deploy();
  console.log("Token address", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//// const getChains = async () => {
//   const result = await axios.get(
//     " https://testnet.api.squidrouter.com/v1/chains "
//   );

//   const data = result.data;
//   console.log("ChainData", data);
//   return data;
// };

// const getTokens = async () => {
//   const result = await axios.get(
//     " https://testnet.api.squidrouter.com/v1/tokens "
//   );
//   const data = result.data;
//   console.log("TokenData", data);
//   return data;
// };

//await getTokens();
// await getChains();
// }