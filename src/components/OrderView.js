import styles from "./OrderView.module.css"
import createOrderIcon from "../assets/create-order-icon.png"
import OrderJSON from "../order.json";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BigNumber from 'bignumber.js';
import partiesData from "data/parties.json"
import OrderTable from "./OrderTable";

const OrdersView = ({ userRole }) => {
    const [data, updateData] = useState({});
    const [dataFetched, updateFetched] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const renderOrderTable = () => {
        switch (selectedOption) {
            case 1:
                return <OrderTable filter="1st" role={userRole} data={data} />;
            case 2:
                return <OrderTable filter="2nd" role={userRole} data={data} />;
            case 3:
                return <OrderTable filter="3rd" role={userRole} data={data} />;
            default:
                return null;
        }
    };

    const getAllNFT = async () => {
        console.log('getAllNFT called');

        const ethers = require("ethers");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.enable();
        const signer = provider.getSigner();

        // console.log(signer);
        let contract = new ethers.Contract(OrderJSON.address, OrderJSON.abi, signer)
        let transaction = await contract.getMyOrders();

        // console.log(transaction);
        const items = await Promise.all(
            transaction
                // // Test code, remove in production
                // .filter(i => {
                //     const currId = new BigNumber(i.orderId._hex);
                //     return currId.isGreaterThanOrEqualTo(12) && currId.isLessThanOrEqualTo(15);
                // })
                .map(async i => {
                    const tokenURI = await contract.tokenURI(i.orderId);
                    // Process tokenURI here

                    // console.log(i);

                    const response = await (await fetch(tokenURI)).json()
                    // console.log(response);
                    let item = {
                        drug: response.drug,
                        orderId: parseInt(i.orderId.toString(), 10),
                        issueDate: response.issueDate,
                        expectedDate: response.expectedDate,
                        distributor: response.distributor,
                        customer: response.customer,
                        manufacturer: response.manufacturer,
                        status: i.status,
                    }

                    // console.log(item);
                    return item
                    // let meta = await axios
                    //     .get(tokenURI);
                    // console.log(tokenURI, i.orderId, meta)
                })
        );

        console.log(items);
        updateFetched(true);
        updateData(items);
    }

    // getAllNFT();
    useEffect(() => {
        getAllNFT();
    }, [])

    let navigate = useNavigate();
    const routeChange = () => {
        navigate("../create-order");
    }

    return (
        <>
            <div className={styles.orderNavbar}>
                {userRole === 0 && (
                    <div className={styles.orderNavbarOptions}>
                        <li onClick={() => setSelectedOption(1)} className="orderNavbarOption">All Orders</li>
                        <li onClick={() => setSelectedOption(2)} className="orderNavbarOption">In-Progress Orders</li>
                        <li onClick={() => setSelectedOption(3)} className="orderNavbarOption">Completed Orders</li>
                    </div>
                )}
                {userRole === 1 && (
                    <div className={styles.orderNavbarOptions}>
                        <li onClick={() => setSelectedOption(1)} className="orderNavbarOption">All Orders</li>
                        <li onClick={() => setSelectedOption(2)} className="orderNavbarOption">Incoming Orders</li>
                        <li onClick={() => setSelectedOption(3)} className="orderNavbarOption">Forwarded Orders</li>
                    </div>
                )}
                {userRole === 2 && (
                    <div className={styles.orderNavbarOptions}>
                        <li onClick={() => setSelectedOption(1)} className="orderNavbarOption">All Orders</li>
                        <li onClick={() => setSelectedOption(2)} className="orderNavbarOption">Incoming Orders</li>
                        <li onClick={() => setSelectedOption(3)} className="orderNavbarOption">Return Orders</li>
                    </div>
                )}
                {userRole === 0 ? (
                    <div>
                        <button className={styles.createOrder} onClick={() => routeChange()}>
                            <img src={createOrderIcon} className={styles.createOrderIcon} alt="create order icon"></img>
                            <div>
                                <h3>Create New Order</h3>
                                <h4>This will mint the NFT for you</h4>
                            </div>
                        </button>
                    </div>
                ) : null}
            </div>
            <div>
                {renderOrderTable()}
            </div>
        </>
    )
}

export default OrdersView;
