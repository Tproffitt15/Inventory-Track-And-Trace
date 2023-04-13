const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

const main = async () => {

    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account: ", deployer.address);

    // const gasPrice = ethers.utils.parseUnits("30", "gwei");
    // const gasLimit = 2000000;

    const nftContractFactory = await hre.ethers.getContractFactory('OrderNFT');

    // const nftContract = await nftContractFactory.deploy({ gasPrice, gasLimit });

    const nftContract = await nftContractFactory.deploy();

    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    const data = {
        address: nftContract.address,
        abi: JSON.parse(nftContract.interface.format('json'))
    }

    fs.writeFileSync('./src/order.json', JSON.stringify(data))
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