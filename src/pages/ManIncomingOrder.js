import "./ManIncomingOrder.css"

import IncomingOrderTable from "components/IncomingOrderTable"

const ManIncomingOrder = () => {
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
        <div className="container">
            <h1> Incoming Order From [Manufacturer]</h1>
            <div className="content">
                <IncomingOrderTable orderData={orderData}/>
            </div>
            <button id="declineButton">Decline</button>
            <button id="recieveButton">Receive</button>
        </div>
    );
}

export default ManIncomingOrder;