import formatPropertyName from "./Helper";

const IncomingOrderTable = ({ orderData }) => {
    const keys = Object.keys(orderData);

    return (
        <table>
        <tbody>
            {keys.map((key) => {
                return (
                    <tr key={key}>
                        <td>{formatPropertyName(key)}</td>
                        <td>{orderData[key]}</td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    );
};

export default IncomingOrderTable;