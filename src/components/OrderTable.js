import orderData from "data/orders.json"
import "./OrderTable.css"

import formatPropertyName from "./Helper";

import { Link, withRouter } from "react-router-dom";
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
    const routeChange  = (index) =>{ 
        navigate(`${index + 1}`);
      }

    return (
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
                        <tr key={index} onClick={() => routeChange(index)}>
                            {getHeadings().map((key) => {
                                return <td key={row[key]}>{row[key]}</td>
                            })}
                        </tr>
                    );
                })}

            </tbody>
        </table>
    );
}

export default OrderTable;