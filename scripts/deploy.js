const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

const main = async () => {

    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account: ", deployer.address);


    const nftContractFactory = await hre.ethers.getContractFactory('OrderNFT');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    const data = {
        address: nftContract.address,
        abi: JSON.parse(nftContract.interface.format('json'))
    }

    fs.writeFileSync('./order.json', JSON.stringify(data))
    // Generate random addresses
    // const rand1 = ethers.Wallet.createRandom();
    // const rand2 = ethers.Wallet.createRandom();
    // const addresses = [deployer.address, rand1.address, rand2.address];
    // console.log("Random Address 1:", rand1.address);
    // console.log("Random Address 2:", rand2.address);
    // console.log("List addresses:", addresses)

    // // Call the function.
    // let txn = await nftContract.createOrder("https://www.jsonkeeper.com/b/3CF9", addresses);
    // // Wait for it to be mined.
    // await txn.wait()
    // console.log("Minted Order NFT with data")

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();