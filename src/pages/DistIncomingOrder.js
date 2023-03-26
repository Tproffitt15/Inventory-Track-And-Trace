import "./DistIncomingOrder.css"

import IncomingOrderTable from "components/IncomingOrderTable"

const DistIncomingOrder = () => {
    // orderData is 1 object since this page is showing details on 1 order
    // placeholder for an object
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
        <>
            <h1> Incoming Order From [Distributor]</h1>
            <div className="content">
                <IncomingOrderTable orderData={orderData}/>
            </div>
            <button id="rejectButton">Reject</button>
            <button id="completeButton">Complete</button>
        </>
    );
}

export default DistIncomingOrder;