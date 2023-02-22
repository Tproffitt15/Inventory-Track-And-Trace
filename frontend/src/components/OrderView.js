import "./OrderView.css"
import React, { useState } from 'react';

import OrderTable from "./OrderTable";

const OrdersView = () => {
    const [selectedOption, setSelectedOption] = useState(1);
    const renderOrderTable = () => {
        switch (selectedOption) {
            case 1:
                return <OrderTable filter="all"/>;
            case 2:
                return <OrderTable filter="incoming"/>;
            case 3:
                return <OrderTable filter="forwarded"/>;
            default:
                return null;
            }
      };

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
