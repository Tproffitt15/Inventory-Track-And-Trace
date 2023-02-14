import "./AllOrders.css"

import OrderTable from "components/OrderTable";

const AllOrders = () => {
    return (
        <div>
            <OrderTable filter="all"/> 
        </div>
    );
};

export default AllOrders;