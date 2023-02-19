require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// task("deploy", "Deploy OrderNFT smart contracts", async (taskArgs, hre) => {
//   const nftContractFactory = await hre.ethers.getContractFactory('OrderNFT');
//   const nftContract = await nftContractFactory.deploy();
//   await nftContract.deployed();
//   // console.log("Contract deployed to:", nftContract.address);

//   await hre.run("verify:verify", {
//     address: nftContract.address,
//     constructorArguments: [
//       "OrderNFT",
//       "REAL"   
//     ]
//   })
// });

module.exports = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: process.env.QUICKNODE_API_KEY_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
    },
  },
};