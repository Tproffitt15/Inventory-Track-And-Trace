import "./IncomingOrders.css"

import OrderTable from "components/OrderTable";

const IncomingOrders = () => {
    return (
        <div>
            <OrderTable filter="incoming"/> 
        </div>
    );
};

export default IncomingOrders;