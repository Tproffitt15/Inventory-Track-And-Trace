import Signup from "./pages/Signup"
import CreateOrder from "./pages/CreateOrder";
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            {/* <Route path="/profile/:id" element={<Profile />} /> */}
            {/* <Route path="/all-orders/:id" element={<OrderView />} /> */}
            {/* <Route path="/order-details/:id" element={<OrderDetail />} /> */}
            <Route path="/create-order/" element={<CreateOrder />} />
            {/* <Route path="/order-tracking/" element={<OrderTracking />} /> */}
            {/* <Route path="*" element={<Error />}/> */}
        </Routes>

    </BrowserRouter>
);
}

export default App;
