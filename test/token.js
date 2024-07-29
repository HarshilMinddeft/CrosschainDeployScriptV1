const { expect } = require("chai");

describe("token contract", function () {
  it("Deployment should assign total supply to the owner", async function () {
    const [owner] = await ethers.getSigners(); //ether.getSigner is used to get access of accounts info on blockchain
    console.log("Signer object", owner);
    const token = await ethers.getContractFactory("token"); //created instance of contract to get functions from contract
    const hardhattoken = await token.deploy(); // to deploy
    const ownerBalance = await hardhattoken.checkbalance(owner.address); // owner balance shound be 10000
    console.log("owner address", ownerBalance);

    expect(await hardhattoken.totalsupply()).to.equal(ownerBalance);
  });
  it("For transfer between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners(); //ether.getSigner is used to get access of accounts info on blockchain
    console.log("Signer object", owner);

    const token = await ethers.getContractFactory("token"); //created instance of contract to get functions from contract

    const hardhattoken = await token.deploy(); // to deploy

    await hardhattoken.transfer(addr1.address, 10);
    expect(await hardhattoken.checkbalance(addr1.address)).to.equal(10);

    await hardhattoken.connect(addr1).transfer(addr2.address, 5);
    expect(await hardhattoken.checkbalance(addr2.address)).to.equal(5);
  });
});
