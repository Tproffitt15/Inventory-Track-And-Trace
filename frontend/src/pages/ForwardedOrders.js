import "./ForwardedOrders.css"

import OrderTable from "components/OrderTable";

const ForwardedOrders = () => {
    return (
        <div>
            <OrderTable filter="forwarded"/> 
        </div>
    );
};

export default ForwardedOrders;

