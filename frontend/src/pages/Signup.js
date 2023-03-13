import {Link, Outlet} from "react-router-dom"

import "./Signup.css"

const Signup = () => {
    return (
        <section className="signup">
            <h1>Welcome to Cardinal Health's Inventory Track and Trace</h1>

            <h4>Let's get you set up.</h4>

            <div className="container">
                <form className="form" action="action_page.php" method="post">
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="compName">Company Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="compName" name="compName" placeholder="Company Name"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="compName">Email Address</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="email" name="email" placeholder="example@pmail.com"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="compName">Password</label>
                        </div>
                        <div className="col-75">
                            <input type="password" id="pw" name="pw" placeholder="password..."></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="compName">Choose your company's role</label>
                        </div>
                <div className="col-75">
                    <input type="radio" id="manufacturer" name="manufacturer" value="Manufacturer"></input>
                    <label htmlFor="manufacturer">Manufacturer</label>
                        <br></br>
                    <input type="radio" id="distributer" name="distributer" value="Distributer"></input>
                    <label htmlFor="distributer">Distributer</label>
                        <br></br>
                    <input type="radio" id="customer" name="customer" value="Customer"></input>
            	    <label htmlFor="customer">Customer</label>
                </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <button><Link to="connect" id="submitButton">Next Step</Link></button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Signup;