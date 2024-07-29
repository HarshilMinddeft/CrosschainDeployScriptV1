// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
import "hardhat/console.sol";

contract token {
    string public name = "first token";
    string public symbol = "FT";
    uint256 public totalsupply = 10000;
    address public owner;
    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalsupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) public {
        console.log("transfer %s to %s", balances[msg.sender], to);
        require(balances[msg.sender] >= amount, "Low balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function checkbalance(address account) public view returns (uint256) {
        return balances[account];
    }
}
