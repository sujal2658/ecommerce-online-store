import React, { useState, useEffect } from 'react';
import hero from './assets/hero.jpg'
import hero2 from './assets/hero2.jpg'
import hero3 from './assets/hero3.jpg'
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    hero, // Use imported image (adjust as per your actual image paths)
    hero2,
    hero3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(current => (current + 1) % images.length);
    }, 5000); // Change slide every 5 seconds (5000 ms)

    return () => clearInterval(interval);
  }, );

  return (
    <div className="hero-section">
      {images.map((image, index) => (
        <div
          key={index}
          className={index === currentSlide ? 'slide active' : 'slide'}
          style={{ backgroundImage: `url(${image})` }}
        ><p></p></div>
      ))}
    </div>
  );
};

export default HeroSection;
