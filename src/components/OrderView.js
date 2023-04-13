import "./OrderView.css"
import OrderJSON from "../order.json";
import React, { useEffect, useState } from 'react';
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
                return <OrderTable filter="all" />;
            case 2:
                return <OrderTable filter="incoming" />;
            case 3:
                return <OrderTable filter="forwarded" />;
            default:
                return null;
        }
    };

    const navbarOptions = [
        { label: 'All Orders', value: 'all' },
        { label: 'Incoming Orders', value: 'incoming' },
        { label: userRole === 'customer' ? 'Return Order' : 'Forwarded Orders', value: userRole === 'customer' ? 'return' : 'forwarded' },
    ];


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
                        orderId: parseInt(i.orderId.toString(), 10),
                        issueDate: response.issueDate,
                        expectedDate: response.expectedDate,
                        distributor: response.distributor,
                        customer: response.customer,
                        status: i.status,
                        location: i.location
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

    return (
        <>
            <h1> Order View </h1>
            <div className="orderNavbar">
                {userRole === 0 && (
                    <div>
                        <li onClick={() => setSelectedOption(1)} className="orderNavbarOption">All Orders</li>
                        <li onClick={() => setSelectedOption(2)} className="orderNavbarOption">In-Progress Orders</li>
                        <li onClick={() => setSelectedOption(3)} className="orderNavbarOption">Forwarded Orders</li>
                    </div>
                )}
                {userRole === 1 && (
                    <div>
                        <li onClick={() => setSelectedOption(1)} className="orderNavbarOption">All Orders</li>
                        <li onClick={() => setSelectedOption(2)} className="orderNavbarOption">Incoming Orders</li>
                        <li onClick={() => setSelectedOption(3)} className="orderNavbarOption">Forwarded Orders</li>
                    </div>
                )}
                {userRole === 2 && (
                    <div>
                        <li onClick={() => setSelectedOption(1)} className="orderNavbarOption">All Orders</li>
                        <li onClick={() => setSelectedOption(2)} className="orderNavbarOption">Incoming Orders</li>
                        <li onClick={() => setSelectedOption(3)} className="orderNavbarOption">Return Orders</li>
                    </div>
                )}

            </div>
            <div>
                {renderOrderTable()}
            </div>
            {/* <Outlet/> */}
        </>
    )
}

export default OrdersView;
