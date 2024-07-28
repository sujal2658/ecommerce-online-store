import React, { useContext, useState } from "react";
import { CartContext } from "./context/CartContext";
import Checkout from "./components/Checkout";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

 


  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price_correct * item.quantity, 0);

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  return (
    <div className="cart">
      {!showCheckout ? (
        <>
          {totalItems === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Please go and shop for some products!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                <h2>Cart</h2>
                <ul>
                  {cart.map((product, index) => (
                    <li key={index} className="cart-item">
                      <img src={product.image} alt={product.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <div className="cart-item-info">
                          <h4 className="cart-name-h4">{product.name}</h4>
                          <p className="cart-name-h4" >₹{product.price_correct}</p>
                        </div>
                        <div className="cart-item-quantity">
                          <button onClick={() => decreaseQuantity(product.id)}>-</button>
                          <span>{product.quantity}</span>
                          <button onClick={() => increaseQuantity(product.id)}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(product.id)} className="remove-button">Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cart-summary">
                <h3>Cart Summary</h3>
                <p>Total Items: {totalItems}</p>
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                <button className="checkout-button" onClick={handleCheckoutClick}>Checkout</button>
              </div>
            </>
          )}
        </>
      ) : (
        <Checkout />
      )}
    </div>
  );
};

export default Cart;
