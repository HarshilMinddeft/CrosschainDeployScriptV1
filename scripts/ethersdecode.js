const {ethers} = require('ethers');

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

// Replace this with the encoded data string

const encodedData = "0x846a1bc6000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000340000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000000000420000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000002d99abd9008dc933ff5c0cd271b88309593ab921000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000e4a2a1623d0000000000000000000000000000000000000000000000000000000000000af000000000000000000000000000000000000000000000000000000000000000800000000000000000000000004f193853cc053e08405b6abd003aeeef3dd08cb800000000000000000000000000000000000000000000000000000190fe23f0e10000000000000000000000000000000000000000000000000000000000000002000000000000000000000000d00ae08403b9bbb9124bb305c09058e32c39a48c00000000000000000000000057f1c63497aee0be305b8852b354cec793da43bb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056155534443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000762696e616e636500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a3078346631393338353343633035336530383430356236614264303033414545454633444430386362380000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd00000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000002e000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000c2fa98fab811b785b81c64ac875b31cc9e40f9d20000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c2fa98fab811b785b81c64ac875b31cc9e40f9d2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000d99d1c33f9fc3444f8101754abc46c52416550d10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000c2fa98fab811b785b81c64ac875b31cc9e40f9d200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000d99d1c33f9fc3444f8101754abc46c52416550d1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000010418cbafe50000000000000000000000000000000000000000000000000000000000000b0c00000000000000000000000000000000000000000000000000031ac78804489e00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000e917e81c69bf15238c63abd45d1c335c2fc80bdd00000000000000000000000000000000000000000000000000000190fe23f0e20000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c2fa98fab811b785b81c64ac875b31cc9e40f9d2000000000000000000000000ae13d989dac2f0debff460ac112a837c89baa7cd000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000c2fa98fab811b785b81c64ac875b31cc9e40f9d20000000000000000000000000000000000000000000000000000000000000000"; // Insert your encoded data here
const iface = new ethers.utils.Interface(contractABI);

// Decode the transaction
const tx = { data: encodedData };

try {
    const value = "1218475172026523316"
    const parsedTransaction = iface.parseTransaction(tx ,value);
    const dat = [...parsedTransaction.args[2]];
    // const repAddress = dat[2][3].replace('481a2aae41cd34832ddcf5a79404538bb2c02bc8', "0x7bcB2225b3406EB32712AE4e14aaC119C1b35746");
    // dat[2] = [dat[2][0], dat[2][1], dat[2][2], repAddress, dat[2][4]];
    console.log("secondData", dat);
    console.log("TransectionDetailes=>",parsedTransaction);
    console.log("//////////////////////////////////////////////////////");
    console.log("Calls=>", parsedTransaction.args[2]);
    console.log("/////////////////////////////////////////");
    const token = parsedTransaction.args[0];
    console.log("Token==>",token);
} catch (error) {
    console.error('Error parsing transaction:', error);
}


