import "./OrderView.css"
import OrderJSON from "../order.json";
import React, { useState } from 'react';
import axios from "axios";


import OrderTable from "./OrderTable";

const OrdersView = () => {
    const [data, updateData] = useState({});
    const [dataFetched, updateFetched] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const renderOrderTable = () => {
        switch (selectedOption) {
            case 1:
                return <OrderTable filter="all" />;
            case 2:
                return <OrderTable filter="incoming" />;
            case 3:
                return <OrderTable filter="forwarded" />;
            default:
                return null;
        }
    };

    const getAllNFT = async () => {
        // const sampleData = [
        //     {
        //         "name": "Cardinal Health's Tylenol Order",
        //         "description": "Mayo Clinic order 10 Tylenol from Cardinal Health",
        //         "image": "https://m.media-amazon.com/images/I/71pibzG7xtL.jpg",
        //         "attributes": [
        //             {
        //                 "trait_type": "Number of item",
        //                 "value": "10"
        //             }
        //         ]
        //     },
        //     {
        //         "name": "TriHealth's Blisovi Fe 24 Order",
        //         "description": "Miami Clinic order 1 Pack Tylenol from TriHealth",
        //         "image": "https://m.media-amazon.com/images/I/31CRTjnYkUL.jpg",
        //         "attributes": [
        //             {
        //                 "trait_type": "Number of item",
        //                 "value": "19"
        //             }
        //         ]
        //     }
        // ];
        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();
        const signer = provider.getSigner();

        // console.log(signer);
        let contract = new ethers.Contract(OrderJSON.address, OrderJSON.abi, signer)
        let transaction = await contract.getMyOrders();

        // console.log(transaction);
        // console.log()
        // const items = await Promise.all(transaction.map(async i => {

        //     const tokenURI = await contract.tokenURI(i.orderId);

        //     console.log(tokenURI)

        //     let meta = await axios.get(tokenURI);

        //     // console.log(meta);

        //     meta = meta.data;


        //     // let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        //     let item = {
        //         name: meta.name,
        //         description: meta.description,
        //         image: meta.image
        //     }
        //     return item;
        // }))
        // let transaction = await contract.createOrder(metadatURL, addresses);
        // await transaction.wait();
        // alert("Successfully listed your Order NFT!");
        // console.log(items);
        // updateFetched(true);
        // updateData(items);
    }

    // if (!dataFetched)
    getAllNFT();

    return (
        <>
            <h1> Order View </h1>
            <div className="orderNavbar">
                <li onClick={() => setSelectedOption(1)} className="orderNavbarOption">All Orders</li>
                <li onClick={() => setSelectedOption(2)} className="orderNavbarOption">Incoming Orders</li>
                <li onClick={() => setSelectedOption(3)} className="orderNavbarOption">Forwarded Orders</li>
            </div>
            <div>
                {renderOrderTable()}
            </div>
            {/* <Outlet/> */}
        </>
    )
}

export default OrdersView;
