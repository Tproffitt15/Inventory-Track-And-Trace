import orderData from "data/orders.json"
import "./OrderTable.css"

import formatPropertyName from "./Helper";

import { useNavigate } from "react-router-dom";

function OrderTable({ filter, role}) {
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

    let navigate = useNavigate(); 
    const routeChange  = (index, orderStatus) => { 
        if (role === "manufacturer") {
            navigate(`${index + 1}`);
        }
        else 
            navigate(`${orderStatus}/${index + 1}`);
    }

    return (
        <div className="orderTable">
            <table>
                <thead>
                    <tr>
                        {getHeadings().map(heading => {
                            return <th key={heading}>{formatPropertyName(heading)}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {filterData(filter).map((row, index) => {
                        return (
                            <tr key={index} onClick={() => routeChange(index, row.status)}>
                                {getHeadings().map((key) => {
                                    return <td key={row[key]}>{row[key]}</td>
                                })}
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    );
}

export default OrderTable;