import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const products = [
    { desc: 'carrot', price: '2' },
    { desc: 'apple', price: '4' },
    { desc: 'banana', price: '3' },
    { desc: 'orange', price: '5' },
    { desc: 'grape', price: '6' },
    { desc: 'pear', price: '4' },
    { desc: 'peach', price: '5' },
    { desc: 'plum', price: '4' },
    { desc: 'mango', price: '7' },
    { desc: 'kiwi', price: '6' }
  ];

  const [cart, setCart] = useState([]);
  const [amounts, setAmounts] = useState({});

  const handleAmountChange = (desc, value) => {
    setAmounts({
      ...amounts,
      [desc]: value
    });
  };

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, amount: amounts[product.desc] || 1 }]);
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Product List</h1>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.desc}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <div className="form-group">
                  <label htmlFor={`amount-${index}`}>Amount:</label>
                  <input
                    id={`amount-${index}`}
                    type="number"
                    className="form-control"
                    value={amounts[product.desc] || 1}
                    min={1}
                    onChange={(e) => handleAmountChange(product.desc, e.target.value)}
                  />
                </div>
                <button className="btn btn-primary mt-2" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <h2>Cart</h2>
      <div className="list-group">
        {cart.map((item, index) => (
          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Product:</strong> {item.desc} <br />
              <strong>Amount:</strong> {item.amount} <br />
              <strong>Price:</strong> ${item.amount * item.price}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(index)}>REMOVE ITEM</button>
          </div>
        ))}
      </div>
      <hr />
      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
}

export default App;
