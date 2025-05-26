require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      chainId: 1337,
      account: [process.env.PRIVATE_KEY] // Make sure this matches your .env
    }
  }
};