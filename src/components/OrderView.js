import styles from "./OrderView.module.css"
import createOrderIcon from "../assets/create-order-icon.png"
import OrderJSON from "../order.json";
import OrderTable from "./OrderTable";

import React, { useState } from 'react';
import axios from "axios";
import BigNumber from 'bignumber.js';
import { Link, useNavigate } from "react-router-dom";


const OrdersView = ( {role} ) => {
    const [data, updateData] = useState({});
    const [dataFetched, updateFetched] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const renderOrderTable = () => {
        if (role === "manufacturer") {
            switch (selectedOption) {
                case 1:
                    return <OrderTable filter="all" role="manufacturer" />;
                case 2:
                    return <OrderTable filter="incoming" role="manufacturer" />;
                case 3:
                    return <OrderTable filter="forwarded" role="manufacturer" />;
                default:
                    return null;
            }
        }

        else if (role === "distributor") {
            switch (selectedOption) {
                case 1:
                    return <OrderTable filter="all" role="distributor" />;
                case 2:
                    return <OrderTable filter="incoming" role="distributor" />;
                case 3:
                    return <OrderTable filter="forwarded" role="distributor" />;
                default:
                    return null;
            }
        }
        // for customer
        // else {
        //     switch (selectedOption) {
        //         case 1:
        //             return <OrderTable filter="all" role="distributor" />;
        //         case 2:
        //             return <OrderTable filter="incoming" role="distributor" />;
        //         case 3:
        //             return <OrderTable filter="forwarded" role="distributor" />;
        //         default:
        //             return null;
        //     }
        // }
        
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

    let navigate = useNavigate(); 
    const routeChange = () => { 
        navigate("../create-order");
    }

    return (
        <>
            <div className={styles.orderNavbar}>
                <div className={styles.orderNavbarOptions}>
                    <button onClick={() => setSelectedOption(1)} className={`${styles.orderNavbarOption} ${selectedOption === 1 ? styles.active : ''}`}>All Orders</button>
                    <button onClick={() => setSelectedOption(2)} className={`${styles.orderNavbarOption} ${selectedOption === 2 ? styles.active : ''}`}>Incoming Orders</button>
                    <button onClick={() => setSelectedOption(3)} className={`${styles.orderNavbarOption} ${selectedOption === 3 ? styles.active : ''}`}>Forwarded Orders</button>
                </div>
                <div >
                    <button className={styles.createOrder} onClick={() => routeChange()}>
                        <img src={createOrderIcon} className={styles.createOrderIcon}></img>
                        <div>
                            <h3>Create New Order</h3>
                            <h4>This will mint the NFT for you</h4>
                        </div>                       
                    </button>
                </div>
            </div>
            <div>
                {renderOrderTable()}
            </div>
            {/* <Outlet/> */}
        </>
    )
}

export default OrdersView;
