import styles from "./DistForwardOrder.module.css";
import IncomingOrderTable from "components/IncomingOrderTable"; // might create a separate OrderTable component

const DistForwardOrder = () => {
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

    function forwardOrder () {
        console.log("distributor received order, redirect to forward order");
    }

    function cancel () {
        console.log("distributor reject order, redirect to all orders");
    }

    return (
        <div className="container">
            <h1> Incoming Order From [Distributor]</h1>
            <div className={styles.content}>
                <IncomingOrderTable orderData={orderData}/>
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={cancel()}>Cancel</button>
                <button className={styles.button} onClick={forwardOrder()}>Forward</button>
            </div>
        </div>
    );
}

export default DistForwardOrder;