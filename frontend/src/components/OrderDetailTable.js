import orderData from "data/orders.json"

function OrderDetailsTable({ orderId }) {
    const getHeadings = () => {
        return Object.keys(orderData[0]);
    }
    const order = orderData.find((order) => order.order_number === Number(orderId));
    console.log(order);
    return (
        <table>
            <thead>
                <tr>
                {getHeadings().map(heading => {
                    return <th key={heading}>{heading}</th>
                })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {getHeadings().map((key) => {
                        console.log(order[key]);
                        return (
                            <td key={key}>{order[key]}</td>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
}

export default OrderDetailsTable;