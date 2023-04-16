import styles from "./DistIncomingOrder.module.css";
import IncomingOrderTable from "components/IncomingOrderTable";

const DistIncomingOrder = () => {
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

    function receiveOrder () {
        console.log("distributor received order, redirect to forward order");
    }

    function rejectOrder () {
        console.log("distributor reject order, redirect to all orders");
    }

    return (
        <div className="container">
            <h1> Incoming Order From [Manufacturer]</h1>
            <div className={styles.content}>
                <IncomingOrderTable orderData={orderData}/>
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={rejectOrder()}>Reject</button>
                <button className={styles.button} onClick={receiveOrder()}>Receive</button>
            </div>
        </div>
    );
}

export default DistIncomingOrder;