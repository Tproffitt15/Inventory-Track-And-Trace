import {Link, Outlet} from "react-router-dom"

const OrderViewNavbar = () => {
    return (
        <>
            <div className="orderViewNavbar">
                <h1> Order Details </h1>

                <Link to="details" className="orderViewNavbarOption">General Info</Link>
                <Link to="shipping" className="orderViewNavbarOption">Shipping Info</Link>
            </div>
            <Outlet/>
        </>
    );
}

export default OrderViewNavbar;