import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import logo from "./assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container">
      <header className="App-header">
        <div className="header-content">
          <div className="left-section">
            <button className="menu-button" onClick={toggleMenu}>
              ☰
            </button>
            <NavLink to="/" onClick={toggleMenu}>
            <img src={logo} alt="Logo" className="logo" /> 
            </NavLink>
            
            <h1>Optimax 
            </h1>
            <nav className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
              <NavLink to="/product" onClick={toggleMenu}>
                Product
              </NavLink>
              <NavLink to="/orders" onClick={toggleMenu}>
                Your Orders
              </NavLink>
              <NavLink to="/cart" onClick={toggleMenu}>
                Cart
              </NavLink>
            </nav>
          </div>
          <div className="right-section">
            <NavLink to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="cart-count">{totalItems}</span>
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
