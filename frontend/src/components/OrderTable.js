import orderData from "data/orders.json"
import "./OrderTable.css"

import { Link } from "react-router-dom";

function OrderTable({ filter }) {
    const getHeadings = () => {
        return Object.keys(orderData[0]);
    }
    const filterData = (filter) => {
        if (filter === "all") {
            return orderData;
        }
        else {
            return orderData.filter(row => row.status === filter);
        }
    }
    return (
        <table>
            <thead>
                <tr>
                {getHeadings().map(heading => {
                    return <th key={heading}>{heading}</th>
                })}
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {filterData(filter).map((row, index) => {
                    return (
                        <tr key={index} >
                            {getHeadings().map((key, index) => {
                                return <td key={row[key]}>{row[key]}</td>
                            })}
                            <td><Link to={`${index + 1}`}>View Details</Link></td>
                        </tr>
                    );
                })}

            </tbody>
        </table>
    );
}

export default OrderTable;