import styles from "./Signup.module.css"
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="container">
      <h1>Welcome to Cardinal Health's Inventory Track and Trace.</h1>
      <p>Let's get you set up.</p>
      <form>
        <div className={styles.group}>
          <label htmlFor="company-name">Company Name:</label>
          <input type="text" id="company-name" name="company-name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="company-role">Choose Company Role:</label>
          <select id="company-role" name="company-role" required>
            <option value="" disabled selected>
              Select role
            </option>
            <option value="manufacturer">I'm a Manufacturer</option>
            <option value="distributor">I'm a Distributor</option>
            <option value="customer">I'm a Customer</option>
          </select>
        </div>
        <button type="submit" className="next">Next Step</button>
      </form>
    </div>
  );
};

export default Signup;
