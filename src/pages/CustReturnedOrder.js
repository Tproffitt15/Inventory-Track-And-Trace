import styles from "./CustReturnedOrder.module.css";
import IncomingOrderTable from "components/IncomingOrderTable";

const CustReturnedOrder = () => {
  const orderData = {
    "order_number": 1,
    "issue_date": "22/12/22",
    "expected_date": "23/01/22",
    "manufacturer": "Cardinal Health",
    "customer": "Miami Uni",
    "tracking_number": "12984791",
    "tracking_URL": "tracking_URL.com",
    "status": "completed"
  };

    function completeOrder () {
        console.log("customer received order, flow finished");
    }

    function rejectOrder () {
        console.log("customer reject order, redirect to return order");
    }

    return (
        <div className="container">
            <h1> Return Order to [Distributor]</h1>
            <div className={styles.content}>
                <IncomingOrderTable orderData={orderData}/>
            </div>
        </div>
    );
}

export default CustReturnedOrder;