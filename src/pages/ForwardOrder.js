import "./Forward.css"

const ForwardOrder = () => {
  return (
    <div className="container">
      <h1>Forward Order Number #000001</h1>
      <div className="order-info">
        <h2>
          Order Number: <span>123456789</span>
        </h2>
        <h2>
          Tracking Number: <span>1234567890</span>
        </h2>
        <h3>Order Details:</h3>
        <ul>
          <li>Product 1 - 2 items</li>
          <li>Product 2 - 1 item</li>
          <li>Product 3 - 3 items</li>
        </ul>
        <h3>Delivery Address:</h3>
        <div>
          <address>
            John Doe<br />
            123 Main St<br />
            Anytown, USA 12345
          </address>
        </div>
        <h3>
          Issue Date: <span>April 6, 2023</span>
        </h3>
        <h3>
          Delivery by Date: <span>April 12, 2023</span>
        </h3>
      </div>
      <div className="forward">
        <form>
          <h2>Forward Order to:</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit" className="forward-order">
            Forward Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForwardOrder;
