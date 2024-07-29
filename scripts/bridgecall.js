const hre = require("hardhat");

async function main() {
  const SquidRouter = await hre.ethers.getContractFactory("SquidRouter");
  const squidRouterAddress = "0x9659BdAA80fd581fDcFE462492F4c7182E0c7290"; //sep router
  const squidRouter = await SquidRouter.attach(squidRouterAddress);

  const signer = await hre.ethers.getSigner();
  const signerAddress = await signer.getAddress();
  console.log(signerAddress);

  // Define the parameters for the bridgeCall function
  const bridgedTokenSymbol = "aUSDC"; // Example token symbol
  const amount = hre.ethers.utils.parseUnits("0.01", 6); // Amount to bridge (assuming 6 decimals for USDC)
  // const amount = "1";
  const destinationChain = "Avalanche"; // Example destination chain
  const destinationAddress = "0x7E3a86C598A47C9067833c0af50760DfAE707C18"; // avax
  const gasRefundRecipient = "0xe917e81c69Bf15238c63abd45d1c335C2fc80bDD"; // Example gas refund recipient
  const enableExpress = false;
  const payload =
    "0x2147796000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005615553444300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000094176616c616e6368650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a3078346631393338353343633035336530383430356236614264303033414545454633444430386362380000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb000000000000000000000000000000000000000000000000000000000000000100000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb0000000000000000000000000000000000000000000000000000000000000001";

  // console.log("Payload=>", payload);

  // Check contract dependencies
  const gatewayAddress = await squidRouter.gateway();
  const gasLimit = 9302610;
  console.log("Gateway address:", gatewayAddress);

  // Get the token contract
  const tokenAddress = "0x254d06f33bDc5b8ee05b2ea472107E300226659A";
  const token = await hre.ethers.getContractAt(
    "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
    tokenAddress
  );

  // Approve the router to spend the tokens
  const approveTx = await token.approve(squidRouterAddress, amount);
  console.log("Approve transaction hash:", approveTx.hash);

  // Wait for the approval transaction to be mined
  await approveTx.wait();
  console.log("Tokens approved for spending.");

  // Calculate the value for the transaction (e.g., gas fees)
  const value = hre.ethers.utils.parseEther("0.01"); // Example value in ETH for gas

  // Call the bridgeCall function
  try {
    const tx = await squidRouter.bridgeCall(
      bridgedTokenSymbol,
      amount,
      destinationChain,
      destinationAddress,
      payload,
      gasRefundRecipient,
      enableExpress,
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

// const payload = hre.ethers.utils.defaultAbiCoder.encode(
//   [
//     "uint256", // bsc
//     "address", // ausd from bsc
//     "uint256", // 0.1 ausd (needs to be uint256, representing 1 in smallest unit)
//     "uint256", // avax
//     "address", // axlUSDC on Moonbeam
//     "address", // ethers.signer.address; transaction sender address
//     "address", // the recipient's address
//     "uint256", // slippage (3.00% as uint256)
//     "bool", // false
//   ],
//   [
//     97, // bsc
//     "0xc2fA98faB811B785b81c64Ac875b31CC9E40F9D2", // ausd from bsc
//     "1", // 0.1 ausd
//     11155111, // sepolia
//     "0x254d06f33bDc5b8ee05b2ea472107E300226659A", // axlUSDC on sepolia
//     "0xe917e81c69Bf15238c63abd45d1c335C2fc80bDD", // ethers.signer.address; transaction sender address
//     "0xe917e81c69Bf15238c63abd45d1c335C2fc80bDD", // the recipient's address
//     3, // 3 --> 3.00% slippage. SDK supports 2 decimals
//     false,
//   ]
// );
