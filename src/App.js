import './App.css';
import { useWeb3React } from '@web3-react/core';
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
import { useWalletAddress } from 'hooks/useWalletAddress';
import { useGetUserRole } from 'hooks/useGetUserRole';

//testing
// import DistIncomingOrder from 'pages/DistIncomingOrder';
// import DistForwardOrder from 'pages/DistForwardOrder';
// import DistForwardedOrder from 'pages/DistForwardedOrder';
// import ManIncomingOrder from 'pages/ManIncomingOrder';
// import CustIncomingOrder from 'pages/CustIncomingOrder';
// import CustRejectOrder from 'pages/CustRejectOrder';
// import CustReturnOrder from 'pages/CustReturnOrder';
// import CustRejectedOrder from 'pages/CustRejectedOrder';
// import CustReturnedOrder from 'pages/CustReturnedOrder';

function App() {
    function getLibrary(provider) {
        return new Web3(provider)
    }

    const walletAddress = useWalletAddress();
    const userRole = useGetUserRole(walletAddress);
    console.log(walletAddress, userRole);

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
                    {/* <Route path="/manufacturer"> */}
                    <Route path="userId" element={<HomepageNavbar />}>

                        <Route path="create-order" element={<CreateOrder />} />
                        <Route path="orders/*/:orderId" element={<Navigate replace to="orders/:orderId" />} />
                        <Route path="orders" element={<OrderView userRole={userRole} />} />
                        <Route path="orders/:orderId" element={<OrderDetails />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="*" element={<Error />} />
                    </Route>

                    <Route path="*" element={<Error />} />
                </Routes>

            </BrowserRouter>
        </Web3ReactProvider>
    );
}

export default App;
