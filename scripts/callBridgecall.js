const hre = require("hardhat");
const { BigNumber } = require('ethers');
const axios = require("axios");

async function main(
  fromChain,
  toChain,
  fromToken,
  toToken,
  fromAmount,
  fromAddress,
  toAddress,
  slippage
) {

  const integratorId = "yash-swap-widget";
  const queryParams = {
    fromChain: fromChain,
    toChain: toChain,
    fromToken: fromToken,
    toToken: toToken,
    fromAmount: fromAmount,
    fromAddress: fromAddress,
    toAddress: toAddress,
    slippage: slippage.toString(),
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const baseUrl = "https://testnet.api.0xsquid.com/v1/route";
  const url = `${baseUrl}?${queryString}`;

  console.log("Request URL:", url); // Log the URL
  console.log("Headers:", {
    "x-integrator-id": integratorId,
    "Content-Type": "application/json",
  });

  try {
    const result = await axios.get(url, {
      headers: {
        "x-integrator-id": integratorId,
        "Content-Type": "application/json",
      },
    });
    const route = result.data; //AllApiData
    const value = route.route.transactionRequest.value; //Value
    const gasLimit = route.route.transactionRequest.gasLimit; //GasLimit
    const encodedData = route.route.transactionRequest.data; //payloadData
    const amount = route.route.estimate.fromAmount;
    // console.log("Route=>", route);
    // console.log("Router.symbols",route.route.params.toToken,route.route.params.fromToken,"check",route.route.estimate.route.fromChain[0].fromToken);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DecodeData


const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_gateway",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_gasService",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_forecallGasService",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_multicall",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AlreadyForecalled",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ApprovalFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ContractIsPaused",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotApprovedByGateway",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotPauser",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotPendingPauser",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroAddressProvided",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "payloadHash",
        "type": "bytes32"
      }
    ],
    "name": "CrossMulticallExecuted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "payloadHash",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "reason",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "refundRecipient",
        "type": "address"
      }
    ],
    "name": "CrossMulticallFailed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "currentPauser",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "pendingPauser",
        "type": "address"
      }
    ],
    "name": "PauserProposed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "pendingPauser",
        "type": "address"
      }
    ],
    "name": "PauserUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "FORECALLERS_SALT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "acceptPauser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "amountPostFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "bridgedTokenSymbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "destinationChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "destinationAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "gasRefundRecipient",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "enableExpress",
        "type": "bool"
      }
    ],
    "name": "bridgeCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "enum ISquidMulticall.CallType",
            "name": "callType",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "payload",
            "type": "bytes"
          }
        ],
        "internalType": "struct ISquidMulticall.Call[]",
        "name": "calls",
        "type": "tuple[]"
      },
      {
        "internalType": "string",
        "name": "bridgedTokenSymbol",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "destinationChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "destinationAddress",
        "type": "string"
      }
    ],
    "name": "callBridge",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "enum ISquidMulticall.CallType",
            "name": "callType",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "payload",
            "type": "bytes"
          }
        ],
        "internalType": "struct ISquidMulticall.Call[]",
        "name": "calls",
        "type": "tuple[]"
      },
      {
        "internalType": "string",
        "name": "bridgedTokenSymbol",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "destinationChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "destinationAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "gasRefundRecipient",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "enableExpress",
        "type": "bool"
      }
    ],
    "name": "callBridgeCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractId",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "commandId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "sourceChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sourceAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      }
    ],
    "name": "execute",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "commandId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "sourceChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sourceAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "tokenSymbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "executeWithToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "sourceChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sourceAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      }
    ],
    "name": "forecall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "sourceChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sourceAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "tokenSymbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "forecallWithToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "enum ISquidMulticall.CallType",
            "name": "callType",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "target",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "callData",
            "type": "bytes"
          },
          {
            "internalType": "bytes",
            "name": "payload",
            "type": "bytes"
          }
        ],
        "internalType": "struct ISquidMulticall.Call[]",
        "name": "calls",
        "type": "tuple[]"
      }
    ],
    "name": "fundAndRunMulticall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gateway",
    "outputs": [
      {
        "internalType": "contract IAxelarGateway",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "sourceChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sourceAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      }
    ],
    "name": "getForecaller",
    "outputs": [
      {
        "internalType": "address",
        "name": "forecaller",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "sourceChain",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sourceAddress",
        "type": "string"
      },
      {
        "internalType": "bytes",
        "name": "payload",
        "type": "bytes"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getForecallerWithToken",
    "outputs": [
      {
        "internalType": "address",
        "name": "forecaller",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "value",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pauser",
    "outputs": [
      {
        "internalType": "address",
        "name": "value",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pendingPauser",
    "outputs": [
      {
        "internalType": "address",
        "name": "value",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newPauser",
        "type": "address"
      }
    ],
    "name": "updatePauser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// const encodedData = "0x846a1bc6000000000000000000000000f194afdf50b03e69bd7d057c1aa9e10c9954e4c900000000000000000000000000000000000000000000000000005af3107a4000000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000004c00000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000054000000000000000000000000000000000000000000000000000000000000005a0000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f194afdf50b03e69bd7d057c1aa9e10c9954e4c9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000e3d8bd6aed4f159bc8000a9cd47cffdb95f9612100000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e3d8bd6aed4f159bc8000a9cd47cffdb95f96121000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000010438ed173900000000000000000000000000000000000000000000000000005af3107a4000000000000000000000000000000000000000000000000000000000000000001700000000000000000000000000000000000000000000000000000000000000a00000000000000000000000004f193853cc053e08405b6abd003aeeef3dd08cb800000000000000000000000000000000000000000000000000000190e86b9e7e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000f194afdf50b03e69bd7d057c1aa9e10c9954e4c9000000000000000000000000254d06f33bdc5b8ee05b2ea472107e300226659a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005615553444300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000094176616c616e6368650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a3078346631393338353343633035336530383430356236614264303033414545454633444430386362380000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb000000000000000000000000000000000000000000000000000000000000000100000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b30000000000000000000000002d99abd9008dc933ff5c0cd271b88309593ab921000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000002d99abd9008dc933ff5c0cd271b88309593ab921000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000104676528d10000000000000000000000000000000000000000000000000000000000000017000000000000000000000000000000000000000000000000000000adc205c61d00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd00000000000000000000000000000000000000000000000000000190e86b9e7f000000000000000000000000000000000000000000000000000000000000000200000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb000000000000000000000000d00ae08403b9bbb9124bb305c09058e32c39a48c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb0000000000000000000000000000000000000000000000000000000000000000"; // Insert your encoded data here
const iface = new ethers.utils.Interface(contractABI);
// Decode the transaction
const tx = { data: encodedData };
try {
    // const value = ethers.utils.parseEther("1276198295120323030")
    const parsedTransaction = iface.parseTransaction(tx ,value);
    console.log("TransectionDetailes=>",parsedTransaction);
    console.log("//////////////////////////////////////////////////////")
    const payload= parsedTransaction.args.payload;
    const gasRefundRecipient = parsedTransaction.args.gasRefundRecipient;
    const bridgedTokenSymbol = parsedTransaction.args[3];
    const calls = parsedTransaction.args[2];
    const destinationChain= parsedTransaction.args[4];
    const token = parsedTransaction.args[0];
    const squidRouterAddress = parsedTransaction.args[5];
    console.log("squidRouterAddress=>",squidRouterAddress)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //callbridgeCall Function

  const SquidRouter = await hre.ethers.getContractFactory("SquidRouter");
  // const squidRouterAddress = "0x4f193853Cc053e08405b6aBd003AEEEF3DD08cb8";//Avax
  const squidRouter = await SquidRouter.attach(squidRouterAddress);

  const signer = await hre.ethers.getSigner();
  const signerAddress = await signer.getAddress();
  console.log("Signer address:", signerAddress);

  // Define the parameters for the callBridge function
  // const bridgedTokenSymbol = "aUSDC"; //  token symbol
  // const destinationChain = "Avalanche"; //  destination chain
  const destinationAddress = "0x4f193853Cc053e08405b6aBd003AEEEF3DD08cb8"; //destination avax
  // const amount = hre.ethers.BigNumber.from("100000000000000");
  // const gasRefundRecipient = "0xe917e81c69Bf15238c63abd45d1c335C2fc80bDD"; //gas refund recipient
  const enableExpress = false;

  // Check and approve tokens if needed
  // const token = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  // const tokenContract = await hre.ethers.getContractAt(
  //   "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
  //   token
  // );
  // const allowance = await tokenContract.allowance(
  //   signerAddress,
  //   squidRouterAddress
  // );
  // if (allowance.lt(amount)) {
  //   const approveTx = await tokenContract.approve(squidRouterAddress, amount);
  //   await approveTx.wait();
  //   console.log("Tokens approved.");
  // } else {
  //   console.log("Sufficient allowance already set.");
  // }

  // Calculate the value for the transaction (e.g., gas fees)
  // const gasLimit = hre.ethers.utils.parseEther("0.01");
  // const Value = 446000;
  // Call the callBridge function

  try {
    console.log("token==>", token);
    console.log("amount==>",amount);
    console.log("calls===>",calls);
    console.log("bridgedTokenSymbol===>",bridgedTokenSymbol);
    console.log("destinationChain===>",destinationChain);
    console.log("destinationAddress===>",destinationAddress);
    console.log("payload===>",payload);
    console.log("enableExpress===>",enableExpress);
    console.log("gasLimit===>",gasLimit);
    console.log("Value===>",value);

    const tx = await squidRouter.callBridgeCall(
      token,
      amount,
      calls,
      bridgedTokenSymbol,
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
    console.log("Transection Successful")
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
} catch (error) {
  console.error('Error parsing transaction:', error);
}
return route;
} catch (error) {
  console.error(
    "Error fetching route:",
    error.response ? error.response.data : error.message
  );
  if (error.response) {
    console.error("Status Code:", error.response.status);
    console.error("Headers:", error.response.headers);
  }
}
}

main(
  43113, // fromChain
  97, // toChain
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // fromToken
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // toToken
  "100000000000000", // fromAmount (1 token with 18 decimals)
  "0xe917e81c69Bf15238c63abd45d1c335C2fc80bDD", // fromAddress
  "0xe917e81c69Bf15238c63abd45d1c335C2fc80bDD", // toAddress
  1 // slippage (50% slippage, should typically be a small number like 0.01 for 1%)
).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});