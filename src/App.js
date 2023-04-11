import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import Signup from "./pages/Signup"
import Profile from './pages/Profile';
import CreateOrder from "./pages/CreateOrder";
import Error from './pages/Error';
import HomepageNavbar from './components/HomepageNavbar';
import OrderView from './components/OrderView';
import ConnectWallet from 'pages/ConnectWallet';
import OrderDetails from 'pages/OrderDetails';

//testing
import DistIncomingOrder from 'pages/DistIncomingOrder';
import ManIncomingOrder from 'pages/ManIncomingOrder';

function App() {
    function getLibrary(provider) {
        return new Web3(provider)
    }
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
                <Routes>
                    {/* Route placeholder */}
                    {/* will later add nested routes for each role 
                        example: distributor/:id/profile
                                distributor/:id/all-orders
                                etc.
                    */}
                    

                    {/* <Route path="/signin" element={<Signin />} /> */}
                    <Route path="/" element={<Signup />} />
                    <Route path="/connect" element={<ConnectWallet />} />
                    <Route path="/manufacturer">
                        <Route path="userId" element={<HomepageNavbar />}>
                            <Route path="orders" element={<OrderView role = "manufacturer"/>}/>
                            <Route path="orders/:orderId" element={<OrderDetails/>}/>
                            <Route path="orders/*/:orderId" element={<Navigate replace to ="orders/:orderId" />}/>
                            <Route path="profile" element ={<Profile/>}/>
                            <Route path="create-order" element={<CreateOrder />} />
                            <Route path="*" element={<Error />}/>
                        </Route>
                    </Route>

                    <Route path="/distributor">
                        <Route path="userId" element={<HomepageNavbar />}>
                            <Route path="orders" element={<OrderView role = "distributor"/>}/>
                            <Route path="orders/forwarded/:orderId" element={<OrderDetails/>}/>
                            <Route path="orders/incoming/:orderId" element={<DistIncomingOrder/>}/>
                            <Route path="orders/completed/:orderId" element={<OrderDetails/>}/>
                            <Route path="profile" element ={<Profile/>}/>
                            <Route path="*" element={<Error />}/>
                        </Route>
                    </Route>

                    {/* for customer */}
                    {/* <Route path="/customer">
                        <Route path="userId" element={<HomepageNavbar />}>
                            <Route path="orders" element={<OrderView role = "customer"/>}/>
                            <Route path="orders/forwarded/:orderId" element={<OrderDetails/>}/>
                            <Route path="orders/incoming/:orderId" element={<OrderDetails/>}/>
                            <Route path="orders/completed/:orderId" element={<OrderDetails/>}/>
                            <Route path="profile" element ={<Profile/>}/>
                            <Route path="*" element={<Error />}/>
                        </Route>
                    </Route> */}
                    

                    <Route path="dist-inc-order" element={<DistIncomingOrder/>}/>
                    <Route path="man-inc-order" element={<ManIncomingOrder/>}/>
                    
                    {/* <Route path="/order-tracking/" element={<OrderTracking />} /> */}
                    {/* <Route path="*" element={<Error />}/> */}
                    <Route path="*" element={<Error />}/>
                </Routes>

            </BrowserRouter>
        </Web3ReactProvider>
    );
}

export default App;
