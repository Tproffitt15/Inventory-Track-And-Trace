import "./OrderNavbar.css"

import {Link, Outlet} from "react-router-dom"
const OrderNavbar = () => {
    return (
        <>
            <h1> Order View </h1>
            <div className="orderNavbar">
                <Link to="all" className="orderNavbarOption">All Orders</Link>
                <Link to="incoming" className="orderNavbarOption">Incoming Orders</Link>
                <Link to="forwarded" className="orderNavbarOption">Forwarded Orders</Link>
            </div>
            <Outlet/>
        </>
    )
}

export default OrderNavbar;
