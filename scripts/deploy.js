const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const VotingContract = await ethers.getContractFactory("ZenVoting");
  const votingContract = await VotingContract.deploy();


await votingContract.waitForDeployment(); // Wait for deployment
const address = await votingContract.getAddress(); // Get address asynchronously
console.log("VotingContract address:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });