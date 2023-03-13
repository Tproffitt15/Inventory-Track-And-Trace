import "./ConnectWallet.css"
import OrderJSON from "../order.json";
// import { useState } from "react";

const ConnectWallet = () => {

	const sampleData = [
		{
			"name": "Cardinal Health's Tylenol Order",
			"description": "Mayo Clinic order 10 Tylenol from Cardinal Health",
			"image": "https://m.media-amazon.com/images/I/71pibzG7xtL.jpg",
			"attributes": [
				{
					"trait_type": "Number of item",
					"value": "10"
				}
			]
		},
		{
			"name": "TriHealth's Blisovi Fe 24 Order",
			"description": "Miami Clinic order 1 Pack Tylenol from TriHealth",
			"image": "https://m.media-amazon.com/images/I/31CRTjnYkUL.jpg",
			"attributes": [
				{
					"trait_type": "Number of item",
					"value": "19"
				}
			]
		}
	]

	// const [data, updateData] = useState(sampleData);
	// const [dataFetched, updateFetched] = useState(false);

	const mintOrderNFT = async () => {
		const ethers = require("ethers");
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await window.ethereum.enable();
		const signer = provider.getSigner();

		console.log(signer);
		let contract = new ethers.Contract(OrderJSON.address, OrderJSON.abi, signer)

		const walletAddress1 = "0x9E198E7e4BD33c1cEa00a6A247B7d9AA292f70e7";
		const walletAddress2 = "0xD67600380a79E6252a5f278022Bb523Fd9D9978e";
		const walletAddress3 = "0x0669306140d16EaF8cbF3aDF6122e9502622f078";
		const addresses = [walletAddress1, walletAddress2, walletAddress3];
		// const metadatURL = sampleData[0];
		const metadatURL = "https://www.jsonkeeper.com/b/3CF9";
		let transaction = await contract.createOrder(metadatURL, addresses);
		await transaction.wait();
		alert("Successfully listed your Order NFT!");
	}

	// mintOrderNFT();

	return (
		<div data-v-a11c9dcc="">
			<button className="enableEthereumButton">
				Connect to MetaMask
			</button>
			<h2>Account: <span class="showAccount"></span></h2>
		</div>
	);
};

export default ConnectWallet;