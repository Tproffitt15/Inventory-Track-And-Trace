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

    function receiveOrder () {
        console.log("distributor received order, redirect to forward order");
    }

    function rejectOrder () {
        console.log("distributor reject order, redirect to all orders");
    }

    return (
        <>
            <h1> Incoming Order From [Distributor]</h1>
            <div className="content">
                <IncomingOrderTable orderData={orderData}/>
            </div>
            <button id="rejectButton" onClick={rejectOrder()}>Reject</button>
            <button id="completeButton" onClick={receiveOrder()}>Receive</button>
        </>
    );
}

export default DistIncomingOrder;