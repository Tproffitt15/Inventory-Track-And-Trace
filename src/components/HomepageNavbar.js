import styles from "./HomepageNavbar.module.css"
import cardinalLogo from "../assets/cardinal-health-logo.png"
import profileLogo from "../assets/profile.PNG";
import ordersLogo from "../assets/Orders.PNG";

import { Link, Outlet } from "react-router-dom"


const HomepageNavbar = () => {
    return (
        <div className={styles.HomepageNavbar}>
            <ul>
                {/* <img src="https://www.cardinalhealth.com/content/dam/corp/web/logos/logo-main.png" alt="Cardinal Health logo"></img> */}
                <img src={cardinalLogo} alt="Cardinal Health logo" className={styles.cardinalLogo}></img>
                {/* <li><Link to="create-order" className={styles.HomepageNavbarOption}>Create Orders</Link></li> */}
                              
                <li>
                    <img src={ordersLogo} alt="orders logo" className={styles.icon}></img>
                    <Link to="profile">Profile</Link>
                </li>
                <li>
                    <img src={profileLogo} alt="profile logo" className={styles.icon}></img>
                    <Link to="orders">Orders</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
};

export default HomepageNavbar;