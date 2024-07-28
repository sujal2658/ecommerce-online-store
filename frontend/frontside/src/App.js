import React  from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import './Home.css'
import Product from './components/Product'
import Cart from "./components/Cart"
import ProductDetails from './components/ProductDetails';
import Order from './components/Order';
import Checkout from './components/Checkout';
import Home from './components/Home';
import Layout from './Layout';

// src/App.js


function App() {

  return (
    <Router>
    <div className="App">
      <div className="main-cont-1">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="orders" element={<Order />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
