import "./CreateOrder.css"

const CreateOrder = () => {
    return (
        <section>
            <h2>Create New Order</h2>

            <div className="container">
                <form className="htmlForm" action="action_page.php" method="post">
                    <div className="row">
                        <label htmlFor="orderDetails" className="htmlForm-label">Choose Drug</label>
                        <select name="drugs" id="drugs">
                            <option value="">ibuprofen</option>
                            <option value="">tylenol</option>
                        </select>
                        <label htmlFor="quantity">Quantity (between 1 and 5):</label>
                        <input type="number" id="quantity" name="quantity" min="1" max="5"></input>
                    </div>

                    <h4>From Delivery Address</h4>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="dAddress">Address Line 1</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="dAddress" name="dAddress1" placeholder="From Address.."></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="dAddress2">Address Line 2 (optional)</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="dAddress2" name="dAddress2" placeholder="From Address.."></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="city" name="city"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="state">State</label>
                        </div>
                        <div className="col-75">
                            <select id="state" name="state">
                                <option value="indiana">Indiana</option>
                                <option value="ohio">Ohio</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="city">Zip Code</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="zip" name="zipCode"></input>
                        </div>
                    </div>

                    <h4>To Delivery Address</h4>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="taddress">Address Line 1</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="tAddress" name="tAddress1" placeholder="To Address.."></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="taddress2">Address Line 2 (optional)</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="tAddress2" name="tAddress2"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="tcity" name="tCity"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="state">State</label>
                        </div>
                        <div className="col-75">
                            <select id="tstate" name="tState">
                                <option value="indiana">Indiana</option>
                                <option value="ohio">Ohio</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="city">Zip Code</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="tzip" name="tZipCode"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="deliveryDate">Deliver By</label>
                            <input type="date" id="deliveryDate" name="deliveryDate"></input>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="trackingNum">Tracking #</label>
                            <input type="number" id="trackingNum" name="trackingNumber" placeholder="9400 1000 0000 0000 00"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="uploadFile">Upload File</label>
                            <input type="file" id="uploadFile" name="uploadFile"></input>
                        </div>
                    </div>

                    <br></br>
                    <div className="row">
                        <input type="submit" id="submitButton" value="Create Order"></input>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateOrder;