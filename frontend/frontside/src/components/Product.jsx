import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Set the clicked state of the product
    setProducts(prevProducts => 
      prevProducts.map(prevProduct => 
        prevProduct.id === product.id ? { ...prevProduct, clicked: true } : prevProduct
      )
    );
    // Reset the clicked state after a short delay
    setTimeout(() => {
      setProducts(prevProducts =>
        prevProducts.map(prevProduct =>
          prevProduct.id === product.id ? { ...prevProduct, clicked: false } : prevProduct
        )
      );
    }, 300); // Adjust the delay time as needed
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <Link className='a-link' to={`/products/${product.id}`}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price-crossed">₹{product.price_crossed}</p>
            <p className="product-price-correct">₹{product.price_correct}</p>
            <div className="product-rating">
              {Array.from({ length: product.rating }, (_, index) => (
                <i key={index} className="fa fa-star"><FontAwesomeIcon icon={faStar}/></i>
              ))}
            </div>
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className={`add-to-cart-button ${product.clicked ? 'clicked' : ''}`}
          >
            {product.clicked ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
