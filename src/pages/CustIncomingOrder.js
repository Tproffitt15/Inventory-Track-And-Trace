import styles from "./DistIncomingOrder.module.css";
import IncomingOrderTable from "components/IncomingOrderTable";

const CustIncomingOrder = () => {
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
            <h1> Incoming Order From [Distributor]</h1>
            <div className={styles.content}>
                <IncomingOrderTable orderData={orderData}/>
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={rejectOrder()}>Reject</button>
                <button className={styles.button} onClick={completeOrder()}>Complete</button>
            </div>
        </div>
    );
}

export default CustIncomingOrder;