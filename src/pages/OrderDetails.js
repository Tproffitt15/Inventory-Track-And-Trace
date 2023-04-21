import styles from "./OrderDetails.module.css"
import Status from "components/Status";
import OrderJSON from "../order.json";
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import partiesData from "data/parties.json"
import OrderDetailsTable from "components/OrderDetailTable";
import ShippingInfo from "./ShippingInfo";

const OrderDetails = () => {
    const [selectedOption, setSelectedOption] = useState(1);
    const { orderId } = useParams();
    const orderIdInt = parseInt(orderId);

    const location = useLocation();
    const { data, userRole } = location.state;

    const selectedOrder = data.filter((order) => order.orderId === orderIdInt);

    const status = selectedOrder[0].status;
    // console.log(userRole);
    const manufactureAddress = selectedOrder[0].manufacturer;
    const distributorAddress = selectedOrder[0].distributor;
    const customerAddress = selectedOrder[0].customer;
    const catchAllAddress = partiesData.filter((person) => person.role === 3)[0].address;

    const renderOrderDetailsTable = () => {
        switch (selectedOption) {
            case 1:
                return <OrderDetailsTable orderData={selectedOrder} />;
            case 2:
                return <ShippingInfo />;
            default:
                return null;
        }
    };

    let navigate = useNavigate();
    const routeChange = () => {
        navigate("/userId/orders");
    }

    const transferOwner = async (newOwner, newStatus) => {
        try {
            const ethers = require("ethers");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.enable();
            const signer = provider.getSigner();

            let contract = new ethers.Contract(OrderJSON.address, OrderJSON.abi, signer);
            await contract.transferOwner(orderId, newOwner, newStatus);

            alert('Transfer Owner Success!');
            routeChange();
        } catch (error) {
            console.log(error);
            alert('Transfer Owner Failed!')
        }
    }


    return (
        <div className="container">
            <h1> Order Details </h1>
            <div className={styles.orderDetailsNavbar}>
                <button onClick={() => setSelectedOption(1)} className={`${styles.orderDetailNavbarOption} ${selectedOption === 1 ? styles.active : ''}`}>General Info</button>
                <button onClick={() => setSelectedOption(2)} className={`${styles.orderDetailNavbarOption} ${selectedOption === 2 ? styles.active : ''}`}>Shipping Info</button>
            </div>
            <div>
                {renderOrderDetailsTable()}
            </div>
            <div>
                {/* Distributor see Manufacturer Shipped, which is an incoming order */}
                {userRole === 1 && status === 0 && (
                    <div className={styles.buttonGroup}>
                        <button onClick={() => transferOwner(catchAllAddress, 3)} className={styles.button}>Decline</button>
                        <button onClick={() => transferOwner(distributorAddress, 1)} className={styles.button}>Receive</button>
                    </div>
                )}
                {/* Distributor after received decide to cancel or forward order */}
                {userRole === 1 && status === 1 && (
                    <div className={styles.buttonGroup}>
                        <button onClick={() => transferOwner()} className={styles.button}>Cancel</button>
                        <button onClick={() => transferOwner(distributorAddress, 2)} className={styles.button}>Forward Order</button>
                    </div>
                )}
                {/* Customer see distributor forward choose to reject or complete */}
                {userRole === 2 && status === 2 && (
                    <div className={styles.buttonGroup}>
                        <button onClick={() => transferOwner(catchAllAddress, 4)} className={styles.button}>Reject</button>
                        <button onClick={() => transferOwner(customerAddress, 5)} className={styles.button}>Complete</button>
                    </div>
                )}
                {/* Customer if reject will finish or return the order */}
                {userRole === 2 && status === 4 && (
                    <div className={styles.buttonGroup}>
                        <button onClick={() => transferOwner()} className={styles.button}>Finish</button>
                        <button onClick={() => transferOwner(manufactureAddress, 6)} className={styles.button}>Return Order</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetails;