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

    const route = result.data;
    console.log("Route=>", route);
    // console.log("Router.symbols",route.route.params.toToken,route.route.params.fromToken,"check",route.route.estimate.route.fromChain[0].fromToken);
       const Vvalue = route.route.transactionRequest.value;
    const Gaslimit = route.route.transactionRequest.gasLimit;
    const encodedData = route.route.transactionRequest.data;
    const amount = route.route.estimate.fromAmount;
    // console.log("amount====>",amount)
    // console.log("Value====>",Vvalue)
    // console.log("GasLimit====>",Gaslimit)
    // console.log("Payload====>",encodedData)
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

// Example usage with proper numerical values

main(
  43113, // fromChain
  97, // toChain
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // fromToken
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // toToken
  "100000000000000", // fromAmount (1 token with 18 decimals)
  "0xe917e81c69Bf15238c63abd45d1c335C2fc80bDD", // fromAddress
  "0xe917e81c69Bf15238c63abd45d1c335C2fc80bDD", // toAddress
  2 // slippage (50% slippage, should typically be a small number like 0.01 for 1%)
);