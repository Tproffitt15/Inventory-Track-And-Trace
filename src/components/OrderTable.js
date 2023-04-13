import orderData from "data/orders.json"
import "./OrderTable.css"
import parties from "../data/parties.json";
import getNameFromAddress from "./GetNameFromAddress";
import Status from "./Status";
import { useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";

function OrderTable({ filter, role, data }) {

    const dataArray = Array.from(data);

    const filteredData = useMemo(() => {
        if (filter === "2nd") {
            if (role === 0) {
                return dataArray.filter((order) => [0, 1, 2].includes(order.status));
            } else if (role === 1) {
                return dataArray.filter((order) => order.status === 0);
            } else {
                return dataArray.filter((order) => order.status === 2);
            }
        } else if (filter === "3rd") {
            if (role === 0) {
                return dataArray.filter((order) => [3, 4, 5, 6].includes(order.status));
            } else if (role === 1) {
                return dataArray.filter((order) => order.status === 2);
            } else {
                return dataArray.filter((order) => order.status === 6);
            }
        } else {
            return dataArray;
        }
    }, [dataArray, filter, role]);

    let navigate = useNavigate();
    const routeChange = (index) => {
        navigate(`${index + 1}`);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Issue Date</th>
                    <th>Expected Date</th>
                    <th>Manufacturer</th>
                    <th>Customer</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((order) => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.issueDate}</td>
                        <td>{order.expectedDate}</td>
                        <td>{getNameFromAddress(order.manufacturer)}</td>
                        <td>{getNameFromAddress(order.customer)}</td>
                        <td>{Status[order.status]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default OrderTable;