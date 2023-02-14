import {Link, Outlet} from "react-router-dom"

const HomepageNavbar = () => {
    return (
        <div>
            <ul>
                <li><a className="active" href="createNewOrder.html">Cardinal Health</a></li>
                <li><Link to="orders/all">Orders</Link></li>
                <li><Link to="profile">Profile</Link></li>
            </ul>
            <Outlet/>
        </div>
    );
};

export default HomepageNavbar;