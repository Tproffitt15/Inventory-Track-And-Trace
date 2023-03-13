import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import Signup from "./pages/Signup"
import Profile from './pages/Profile';
import CreateOrder from "./pages/CreateOrder";
import Error from './pages/Error';
import HomepageNavbar from './components/HomepageNavbar';
import OrderView from './components/OrderView';
import ConnectWallet from 'pages/ConnectWallet';
import OrderViewNavbar from 'components/OrderViewNavbar';
import OrderDetails from 'pages/OrderDetails';
import ShippingInfo from 'pages/ShippingInfo';

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
                    <Route path="userId" element={<HomepageNavbar />}>
                        <Route path="orders" element={<OrderView/>}/>
                        <Route path="orders/:orderId" element={<OrderDetails/>}/>
                        <Route path="profile" element ={<Profile/>}/>
                        <Route path="create-order" element={<CreateOrder />} />
                        <Route path="*" element={<Error />}/>
                    </Route>           
                    
                    {/* <Route path="/order-tracking/" element={<OrderTracking />} /> */}
                    {/* <Route path="*" element={<Error />}/> */}
                    <Route path="*" element={<Error />}/>
                </Routes>

            </BrowserRouter>
        </Web3ReactProvider>
    );
}

export default App;
