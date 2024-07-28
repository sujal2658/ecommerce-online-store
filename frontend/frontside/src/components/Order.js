import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import {FaShoppingCart, FaDollarSign, FaTruck }  from 'react-icons/fa'
const Orders = () => {
    const location = useLocation();
    const [contactNumber, setContactNumber] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state && location.state.contactNumber) {
            setContactNumber(location.state.contactNumber);
            fetchOrders(location.state.contactNumber);
        }
    }, [location.state]);

    const fetchOrders = async (contactNumber) => {
        if (!contactNumber) {
            alert('Please enter a contact number');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/orders-by-contact/${contactNumber}/`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setLoading(false);
    };

    const handleFetchOrders = () => {
        fetchOrders(contactNumber);
    };

    
  return (
    <div className="orders">
      <h2>Your Orders</h2>
      <div className="contact-number-input">
        <input
          type="text"
          placeholder="Enter your contact number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <button onClick={handleFetchOrders}>
          <i className="fas fa-shopping-cart"><FaShoppingCart/></i> Fetch Orders
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        orders.length === 0 ? (
          <p className='order-p' >Thank you for choosing us! Go and shop for products.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order">
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.product.id} className="order-item">
                    <img src={`http://127.0.0.1:8000${item.product.image}`} alt={item.product.name} className="order-item-image" />
                    <div className="order-item-details">
                      <h4>{item.product.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                      <p><Link className="a-link-o" to={`/products/${item.product.id}`}>Details...</Link></p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="total-price">
                <i className="fas fa-dollar-sign"><FaDollarSign/></i> Total Price: ₹{order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <h3 className="delivery-info">
                <i className="fas fa-truck"><FaTruck/></i> Hey, your order will be delivered in 3 days
              </h3>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Orders;
