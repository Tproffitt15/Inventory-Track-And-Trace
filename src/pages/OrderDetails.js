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
                return <ShippingInfo orderId={orderId}/>;
            default:
                return null;
        }
    };


    return (
        <>
            <h1> Order Details </h1>
            <div className="orderDetails">
                <div className="orderDetailsNavbar">
                    {/* <li onClick={() => setSelectedOption(1)} className="orderDetailsNavbarOption">General Info</li>
                <li onClick={() => setSelectedOption(2)} className="orderDetailsNavbarOption">Shipping Info</li> */}
                    <div onClick={() => setSelectedOption(1)} className="orderDetailsNavbarOption">
                        General Info
                    </div>
                    <div onClick={() => setSelectedOption(2)} className="orderDetailsNavbarOption">
                        Shipping Info
                    </div>
                </div>
                <div className="orderDetailsContent">
                    {renderOrderDetailsTable()}
                </div>
            </div>

        </>
    );
};

export default OrderDetails;