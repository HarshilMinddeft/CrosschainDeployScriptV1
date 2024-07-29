const hre = require("hardhat");

async function main() {
  const SquidRouter = await hre.ethers.getContractFactory("SquidRouter");
  const squidRouterAddress = "0x9659BdAA80fd581fDcFE462492F4c7182E0c7290";
  const squidRouter = await SquidRouter.attach(squidRouterAddress);

  const signer = await hre.ethers.getSigner();
  const signerAddress = await signer.getAddress();
  console.log("Signer address:", signerAddress);

  // Define the parameters for the callBridge function
  const bridgedTokenSymbol = "aUSDC"; // Example token symbol
  const destinationChain = "Avalanche"; // Example destination chain
  const destinationAddress = "0x02470d83612246E915C9E2e2A45713A8Fc92f7cf"; // Example destination address
  const amount = hre.ethers.utils.parseUnits("1", 6); // Amount to bridge (assuming 6 decimals for USDC)
  const calls = [
    "",
  ];
 
  // Check and approve tokens if needed
  const tokenAddress = "0x254d06f33bDc5b8ee05b2ea472107E300226659A";
  const tokenContract = await hre.ethers.getContractAt(
    "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
    tokenAddress
  );
  const allowance = await tokenContract.allowance(
    signerAddress,
    squidRouterAddress
  );
  if (allowance.lt(amount)) {
    const approveTx = await tokenContract.approve(squidRouterAddress, amount);
    await approveTx.wait();
    console.log("Tokens approved.");
  } else {
    console.log("Sufficient allowance already set.");
  }

  // Calculate the value for the transaction (e.g., gas fees)
  const value = hre.ethers.utils.parseEther("0.01"); // Example value in ETH for gas
  const gasLimit = 5000000;
  // Call the callBridge function
  try {
    const tx = await squidRouter.callBridge(
      tokenAddress,
      amount,
      calls,
      bridgedTokenSymbol,
      destinationChain,
      destinationAddress,
      { value: value, gasLimit: gasLimit }
    );
    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
  } catch (error) {
    if (error.code === "CALL_EXCEPTION") {
      console.error("Transaction failed:", error.transactionHash);
      const receipt = await hre.ethers.provider.getTransactionReceipt(
        error.transactionHash
      );
      console.log("Transaction receipt:", receipt);
    } else {
      console.error("Transaction failed:", error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
