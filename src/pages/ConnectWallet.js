import "./ConnectWallet.css"
import OrderJSON from "../order.json";
// import { useState } from "react";
import { uploadJSONToIPFS } from "../pinata";


const ConnectWallet = () => {

	// const [data, updateData] = useState(sampleData);
	// const [dataFetched, updateFetched] = useState(false);

	const metadatJSON = {
		name: "TriHealth's Blisovi Fe 24 Order",
		description: "Miami Clinic order 1 Pack Tylenol from TriHealth",
		image: "https://m.media-amazon.com/images/I/31CRTjnYkUL.jpg",
		items: 19
	}

	const uploadMetadataToIPFS = async () => {

		try {
			//upload the metadata JSON to IPFS
			const response = await uploadJSONToIPFS(metadatJSON);
			if (response.success === true) {
				console.log("Uploaded JSON to Pinata: ", response)
				return response.pinataURL;
			}
		}
		catch (e) {
			console.log("error uploading JSON metadata:", e)
		}
	}

	const mintOrderNFT = async () => {
		try {
			const metadataURL = await uploadMetadataToIPFS();
			console.log(metadataURL);
			const ethers = require("ethers");
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await window.ethereum.enable();
			const signer = provider.getSigner();

			let contract = new ethers.Contract(OrderJSON.address, OrderJSON.abi, signer)

			const walletAddress1 = "0x9E198E7e4BD33c1cEa00a6A247B7d9AA292f70e7";
			const walletAddress2 = "0xD67600380a79E6252a5f278022Bb523Fd9D9978e";
			const walletAddress3 = "0x0669306140d16EaF8cbF3aDF6122e9502622f078";
			const addresses = [walletAddress1, walletAddress2, walletAddress3];

			let transaction = await contract.createOrder(metadataURL, addresses);
			await transaction.wait();
			alert("Successfully listed your Order NFT!");
		} catch (error) {
			alert("Upload error" + error);
		}

	}

	return (
		<div data-v-a11c9dcc="">
			<button onClick={mintOrderNFT} className="enableEthereumButton">
				Test Mint NFT
			</button>
			<h2>Account: <span class="showAccount"></span></h2>
		</div>
	);
};

export default ConnectWallet;