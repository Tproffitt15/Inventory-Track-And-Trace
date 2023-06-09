import styles from "./OrderDetails.module.css"

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import OrderDetailsTable from "components/OrderDetailTable";
import ShippingInfo from "./ShippingInfo";

const OrderDetails = () => {
    const [selectedOption, setSelectedOption] = useState(1);
    const { orderId } = useParams();
    const renderOrderDetailsTable = () => {
        switch (selectedOption) {
            case 1:
                return <OrderDetailsTable orderId={orderId} />;
            case 2:
                return <ShippingInfo />;
            default:
                return null;
        }
    };


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
            {/* <Outlet/> */}
            {/* <div>
                <label>Media:</label>
                <img src="tylenolNFT.png" alt="tylenolNFT" width="500" height="400"></img>
            </div> */}
        </div>
    );
};

export default OrderDetails;