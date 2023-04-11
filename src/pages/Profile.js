import React from "react";
import styles from "./Profile.module.css";

const Profile = () => {
    return (
        <div className="container">
            <h1>Profile Details</h1>
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="company-name">Company Name:</label>
                    <input type="text" id="company-name" name="company-name" defaultValue="Cardinal Health" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" defaultValue="info@cardinalhealth.com" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="wallet-address">Wallet Address:</label>
                    <input type="text" id="wallet-address" name="wallet-address" defaultValue="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4" required />
                </div>
                <button className={styles.button}>Save Changes</button>
            </div>
        </div>
    );
};

export default Profile;