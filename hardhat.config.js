/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
//wallet2 = 73a1a3b78d531c34e6c0257767de665ba842d7e88d7e7218b87024838cf79f2b
//wallet1 = 757174aa1db90055355225c655fe56c00e42bef3acc0f6b20dd4de147d238c22
const PRIVATE_KEY ="757174aa1db90055355225c655fe56c00e42bef3acc0f6b20dd4de147d238c22";
const ALCHEMY_API_KEY = "RgPwHpP2d9aH-ls-zl8x68sT1I7Yra3v";

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },

  networks: {
    sepolia: {
      chainId: 11155111,
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },

    Avax:{
      chainId: 43113,
      // gasPrice: 25000000000,
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [PRIVATE_KEY],
    },

    CeloAlfajores: {
      chainId: 44787,
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [PRIVATE_KEY],
    },

    polygon: {
      chainId: 80002,
      url: "https://polygon-amoy.g.alchemy.com/v2/sacTpZkraW2mhEVB0d5W85U5FjaMtyKt",
      accounts: [PRIVATE_KEY],
    },

    bsc: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      // gasPrice: 10000000000,
      accounts: [PRIVATE_KEY],
    },

  },
};
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});