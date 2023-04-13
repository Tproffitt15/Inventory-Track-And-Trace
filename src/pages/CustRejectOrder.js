import styles from "./CustRejectedOrder.module.css";
import IncomingOrderTable from "components/IncomingOrderTable";

const CustRejectOrder = () => {
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

    function createReturnOrder () {
        console.log("customer create a return order, flow finished");
    }

    function rejectOrder () {
        console.log("customer reject order, redirect to return order");
    }

    return (
        <div className="container">
            <h1> Reject an Order</h1>
            <div className={styles.content}>
                <label htmlFor="rejectReason">Enter Reason for Rejecting</label>
                <textarea className="rejectReasonText" placeholder="Enter Reason here... " type="text" required maxlength="500" size="500" cols="100" rows="20"></textarea>
            </div>
            <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={rejectOrder()}>Finish</button>
                <button className={styles.button} onClick={createReturnOrder()}>Return Order</button>
            </div>
        </div>
    );
}

export default CustRejectOrder;