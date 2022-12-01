// const main = async () => {
//     const nftContractFactory = await hre.ethers.getContractFactory('OrderNFT');
//     const nftContract = await nftContractFactory.deploy();
//     await nftContract.deployed();
//     console.log("Contract deployed to:", nftContract.address);

//     // Call the function.
//     let txn = await nftContract.createOrder("https://www.jsonkeeper.com/b/3CF9")
//     // Wait for it to be mined.
//     await txn.wait()

//     // Mint another NFT for fun.
//     txn = await nftContract.createOrder("https://www.jsonkeeper.com/b/RUUS")
//     // Wait for it to be mined.
//     await txn.wait()

// };

// const runMain = async () => {
//     try {
//         await main();
//         process.exit(0);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// };

// runMain();