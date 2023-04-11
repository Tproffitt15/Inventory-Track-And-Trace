import React from "react";
import "./Profile.css";

const Profile = () => {
    return (
        <div className="container">
            <h1>Profile</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="company-name">Company Name:</label>
                    <input type="text" id="company-name" name="company-name" value="Cardinal Health" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value="info@cardinalhealth.com" required />
                </div>
                <div className="form-group">
                    <label htmlFor="wallet-address">Wallet Address:</label>
                    <input type="text" id="wallet-address" name="wallet-address" value="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" required />
                </div>
                <button type="submit" className="save">Save Changes</button>
            </form>
        </div>
    );
};

export default Profile;