import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import ProductSlider from './SlideProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ProductReviews from './review/ProductReviews';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(response.data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const images = [product.image, product.image1, product.image2, product.image3].filter(img => img);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    addToCart(product);
    setClicked(true); // Set clicked state to true
    setTimeout(() => setClicked(false), 300); // Reset clicked state after 1 second
  };

  return (
    <div className="product-details">
      <div className="product-images-d">
        {images.length > 1 ? (
          <div className="image-slider">
            <button onClick={handlePrevImage} className="left">&#9664;</button>
            <img 
              src={images[currentImageIndex]} 
              alt={product.name} 
              className="product-image-d" 
            />
            <button onClick={handleNextImage} className="right">&#9654;</button>
          </div>
        ) : (
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image-d" 
          />
        )}
      </div>
      <h2 className="product-name-d">{product.name}</h2>
      <p className="product-description-d">{product.description}</p>
      <p className="product-price-crossed-d">₹{product.price_crossed}</p>
      <p className="product-price-correct-d">₹{product.price_correct}</p>
      <div className="product-rating-d">
              {Array.from({ length: product.rating }, (_, index) => (
                <i key={index} className="fa fa-star"><FontAwesomeIcon icon={faStar}/></i>
              ))}
            </div>

            <button 
        onClick={handleAddToCart} 
        className={`add-to-cart-button-d ${clicked ? 'clicked' : ''}`}
      >
        {clicked ? 'Added' : 'Add to Cart'}
      </button>    

      <div className="product-additional-info-d">
        {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
        {product.color && <p><strong>Color:</strong> {product.color}</p>}
        {product.material && <p><strong>Material:</strong> {product.material}</p>}
        {product.product_dimensions && <p><strong>Product Dimensions:</strong> {product.product_dimensions}</p>}
        {product.mounting_type && <p><strong>Mounting Type:</strong> {product.mounting_type}</p>}
        {product.style && <p><strong>Style:</strong> {product.style}</p>}
        {product.included_components && <p><strong>Included Components:</strong> {product.included_components}</p>}
        {product.number_of_doors !== null && <p><strong>Number of Doors:</strong> {product.number_of_doors}</p>}
        {product.number_of_pieces !== null && <p><strong>Number of Pieces:</strong> {product.number_of_pieces}</p>}
        {product.item_weight && <p><strong>Item Weight:</strong> {product.item_weight} kg</p>}
        {product.description1 &&   <p><strong>Description: </strong> {product.description1}</p> }
      </div>

      <div className='Product-detila-list'><ProductSlider /></div>
      
        <div className="review-container-d">
            <ProductReviews productId={product.id} />
        </div>
   
    </div>
  );
};

export default ProductDetails;
