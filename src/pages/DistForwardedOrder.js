import styles from "./DistForwardedOrder.module.css";
import IncomingOrderTable from "components/IncomingOrderTable"; // might create a separate OrderTable component

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

    return (
        <div className="container">
            <h1> Incoming Order From [Distributor]</h1>
            <div className={styles.content}>
                <IncomingOrderTable orderData={orderData}/>
            </div>
        </div>
    );
}

export default DistIncomingOrder;