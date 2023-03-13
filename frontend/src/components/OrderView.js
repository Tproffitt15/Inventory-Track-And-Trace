import "./OrderView.css"
import OrderJSON from "../order.json";
import React, { useState } from 'react';
import axios from "axios";
import BigNumber from 'bignumber.js';

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

        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();
        const signer = provider.getSigner();

        // console.log(signer);
        let contract = new ethers.Contract(OrderJSON.address, OrderJSON.abi, signer)
        let transaction = await contract.getMyOrders();

        const items = await Promise.all(transaction.map(async i => {

            const rightId = new BigNumber(10);
            const currId = new BigNumber(i.orderId._hex);

            const tokenURI = await contract.tokenURI(i.orderId);
            if (!currId.isEqualTo(rightId)) {
                // console.log(tokenURI);
                const metadatJSON = {
                }
                return metadatJSON;
            }


            // console.log(tokenURI, i.orderId)

            let meta = await axios.get(tokenURI);


            meta = meta.data;
            // console.log(meta);

            let item = {
                name: meta.name,
                description: meta.description,
                image: meta.image,
                items: meta.items
            }
            return item;
        }))

        console.log(items);
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
