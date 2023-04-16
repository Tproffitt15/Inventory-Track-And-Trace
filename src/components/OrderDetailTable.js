// import orderData from "data/orders.json"
import getNameFromAddress from "./GetNameFromAddress";
import Status from "./Status";
import formatPropertyName from "./Helper";

function OrderDetailsTable({ orderData }) {

    console.log(orderData[0])

    return (
        <table>
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Drug</td>
                    <td>{orderData[0].drug}</td>
                </tr>
                <tr>
                    <td>Order Number</td>
                    <td>{orderData[0].orderId}</td>
                </tr>
                <tr>
                    <td>Issue Date</td>
                    <td>{orderData[0].issueDate}</td>
                </tr>
                <tr>
                    <td>Expected Date</td>
                    <td>{orderData[0].expectedDate}</td>
                </tr>
                <tr>
                    <td>Manufacturer</td>
                    <td>{getNameFromAddress(orderData[0].manufacturer)}</td>
                </tr>
                <tr>
                    <td>Customer</td>
                    <td>{getNameFromAddress(orderData[0].customer)}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{Status[orderData[0].status]}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default OrderDetailsTable;