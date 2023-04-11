import styles from "./HomepageNavbar.module.css"

import { Link, Outlet } from "react-router-dom"


const HomepageNavbar = () => {
    return (
        <div className={styles.homepageNavbar}>
            <ul>
                <li><Link to="create-order">Create Orders</Link></li>
                {/* <li><a className="active" href="createNewOrder.html">Cardinal Health</a></li> */}
                <li><Link to="orders">My Orders</Link></li>
                <li><Link to="profile">Profile</Link></li>
            </ul>
            <Outlet />
        </div>
    );
};

export default HomepageNavbar;