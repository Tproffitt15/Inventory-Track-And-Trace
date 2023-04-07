import "./OrderDetails.css"

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
            <div className="orderDetailsNavbar">
                <btn onClick={() => setSelectedOption(1)} className="orderDetailsNavbarOption">General Info</btn>
                <btn onClick={() => setSelectedOption(2)} className="orderDetailsNavbarOption">Shipping Info</btn>
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