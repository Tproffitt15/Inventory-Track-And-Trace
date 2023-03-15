import {Outlet} from "react-router-dom"

import HomepageNavbar from "../components/HomepageNavbar";


const Homepage = () => {
    return (
        <>
            <HomepageNavbar/>
            <div>
                <Outlet/>    
            </div>
        </>
    );
};

export default Homepage