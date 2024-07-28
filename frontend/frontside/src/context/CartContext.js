import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

 

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

    const increaseQuantity = (productId) => {
      setCart((prevCart) =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };
  
    const decreaseQuantity = (productId) => {
      setCart((prevCart) =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
        )
      );
    };
  
    const removeFromCart = (productId) => {
      setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
      setCart([]);
    };

    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(savedCart);
    }, []);
  
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
  
  
    return (
      <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart,clearCart }}>
        {children}
      </CartContext.Provider>
    );
  };