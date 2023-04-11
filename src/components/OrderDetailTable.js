import orderData from "data/orders.json"

import formatPropertyName from "./Helper";

function OrderDetailsTable({ orderId }) {
    const getHeadings = () => {
        return Object.keys(orderData[0]);
    }
    const order = orderData.find((order) => order.order_number === Number(orderId));
    const keys = Object.keys(order);
    console.log(order);
    return (
        <div className="container">
            <div className="tracking-details">
                <table>
                    <tbody>
                        {keys.map((key) => {
                            return (
                                <tr key={key}>
                                    <td>{formatPropertyName(key)}</td>
                                    <td>{order[key]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetailsTable;