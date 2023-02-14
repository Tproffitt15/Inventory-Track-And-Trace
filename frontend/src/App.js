import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup"
import Profile from './pages/Profile';
import AllOrders from './pages/AllOrders';
import CreateOrder from "./pages/CreateOrder";
import IncomingOrders from "./pages/IncomingOrders";
import ForwardedOrders from "./pages/ForwardedOrders";
import Error from './pages/Error';
import HomepageNavbar from './components/HomepageNavbar';
import OrderNavbar from './components/OrderNavbar';

function App() {
return (
    <BrowserRouter>
        <Routes>
            {/* Route placeholder */}
            {/* will later add nested routes for each role 
                example: distributor/:id/profile
                        distributor/:id/all-orders
                        etc.
            */}
            

            {/* <Route path="/signin" element={<Signin />} /> */}
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/connect/" element={<Connect />} /> */}
            <Route path="id" element={<HomepageNavbar />}>
                <Route path="profile" element ={<Profile/>}/>
                <Route path="orders" element={<OrderNavbar/>}>
                    <Route path="all" element={<AllOrders />} />
                    <Route path="incoming" element={<IncomingOrders />} />
                    <Route path="forwarded" element={<ForwardedOrders />} />
                </Route>
                <Route path="*" element={<Error />}/>
            </Route>           
            {/* <Route path="/order-details/:id" element={<OrderDetail />} /> */}
            <Route path="/create-order/" element={<CreateOrder />} />
            {/* <Route path="/order-tracking/" element={<OrderTracking />} /> */}
            {/* <Route path="*" element={<Error />}/> */}
            <Route path="*" element={<Error />}/>
        </Routes>

    </BrowserRouter>
);
}

export default App;
