For callbridgecall avax and bnb native working fine,
for cello chain have uncomment approve function in code and its native token address is not 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE,
other tokens you can comment approve function where token address 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE is used,
moonbase is also working fine just make sure its last step Executed works.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

For bridge call you have to go to squidApi script generate payload and statically paste it in bridgecall script.
for genetating payload adjust chains in function.

For bridgecall we can use our router addresses it is working but while we use callbridgeCall we have to use their routeradress or transection
will be revert by axelar. Their current and latest router address = 0x4f193853Cc053e08405b6aBd003AEEEF3DD08cb8 can find this in api with other data (targetAddress)

Below chains have liquidity for swapping native tokens.
working chains list=:
Avax to bnb,
Bnb to avax,
Avax to cello,
Bnb to cello,
Cello to avax,
Cello to bnb,
Avax to moonbase,
Moonbase to cello,
Bnb to moonbase,
Moonbase to bnb,
Cello to moonbase,
moonbase to cello,
