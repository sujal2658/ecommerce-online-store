import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaGlobe, FaUser, FaHome, FaBuilding, FaCity, FaMapMarkerAlt, FaCreditCard, FaMoneyBillAlt } from 'react-icons/fa';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [contactNumber, setContactNumber] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      contact_number: contactNumber,
      country,
      first_name: firstName,
      last_name: lastName,
      address,
      apartment,
      city,
      state,
      postal_code: postalCode,
      phone_number: phoneNumber,
      payment_method: paymentMethod,
      items: cart.map((item) => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price_correct,
      })),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/orders/",
        orderData
      );

      if (response && response.status === 201) {
        alert("Order placed successfully!");

        // Save order details to local storage
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push({ ...orderData, timestamp: new Date().getTime() });
        localStorage.setItem("orders", JSON.stringify(orders));

        // Clear cart
        clearCart();

        // Navigate to Orders page and pass contact number
        navigate("/orders", { state: { contactNumber } });
      } else {
        console.log("Unexpected response:", response);
        alert("Failed to place order");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(`Error placing order: ${error.response.data}`);
      } else if (error.request) {
        console.error("Network error:", error.request);
        alert("Network error: Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contactNumber"><FaPhone /> Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country"><FaGlobe /> Country/Region:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName"><FaUser /> First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName"><FaUser /> Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address"><FaHome /> Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apartment"><FaBuilding /> Apartment, suite, etc.:</label>
          <input
            type="text"
            id="apartment"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city"><FaCity /> City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state"><FaMapMarkerAlt /> State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode"><FaMapMarkerAlt /> PIN Code:</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber"><FaPhone /> Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="payment-methods">
          <h3>Payment Method:</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <FaMoneyBillAlt /> Cash on Delivery (COD)
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <FaCreditCard /> Online Payment
          </label>
        </div>
        <button className="button-c" type="submit">
          Place Order
          <svg className="cartIcon" viewBox="0 0 576 512">
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Checkout;
