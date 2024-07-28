import React from "react";
import HeroSection from "./HeroSection";
import ProductSlider from "./SlideProduct";
import cainets10 from "./assets/cainets10.jpg";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <HeroSection />
      </div>

      <div className="main-p">
        <div className="image-text-section-p">
          <div className="image-container-p">
            <img src={cainets10} alt="Description" />
          </div>
          <div className="text-container-p">
            <h1>Optimax, Your Home for Custom Cabinets</h1>
            <p>
              Optimax custom kitchen cabinets are created with expert
              craftsmanship. Find out what our customers have to say about
              Omega.
            </p>
            <NavLink className="product-link" to="/product">
              Shop
            </NavLink>
          </div>
        </div>
      </div>

      <div>
        <hr />
        <h4 className="product-h4">Product List</h4>
        <hr />
        <ProductSlider />
      </div>

      <div>
        <div className="faq-section">
          <h1>FAQs</h1>
          <div className="faq-item">
            <h2>
              What types of acrylic cabinets are available for different rooms
              in the home?
            </h2>
            <p>
              Acrylic cabinets come in various styles and are suitable for
              different rooms. In the kitchen, you can find sleek acrylic
              kitchen cabinets and pantry cabinets. For the bedroom, options
              include acrylic wardrobes and dressers. The living room can
              feature TV stands, media storage, and display cabinets.
              Additionally, there are acrylic cabinets designed for bathrooms,
              offices, and general storage needs.
            </p>
          </div>
          <div className="faq-item">
            <h2>
              Can I customize the color and design of the acrylic cabinets to
              match my existing decor?
            </h2>
            <p>
              Yes, acrylic cabinets offer extensive customization options for
              color and design. They are available in a wide range of finishes,
              and you can often choose the handles or knobs to match your decor.
              This flexibility allows you to create a cohesive look throughout
              your home.
            </p>
          </div>
          <div className="faq-item">
            <h2>
              Are there acrylic cabinets suitable for small spaces or
              apartments?
            </h2>
            <p>
              Absolutely, acrylic cabinets are known for their space-saving
              solutions. You can find wall-mounted units, slim bookshelves, and
              modular storage systems made from acrylic that are perfect for
              small spaces and apartments, maximizing functionality without
              compromising style.
            </p>
          </div>
          <div className="faq-item">
            <h2>
              What materials are commonly used in acrylic cabinet construction,
              and how do they impact durability?
            </h2>
            <p>
              Acrylic cabinets typically use a combination of acrylic sheets and
              other supportive materials like MDF or plywood. Acrylic is known
              for its durability and glossy finish, which adds a modern touch to
              any room. The use of high-quality substrates ensures strength and
              longevity, while the acrylic surface provides resistance to
              moisture and scratches.
            </p>
          </div>
          <div className="faq-item">
            <h2>
              Can I use acrylic kitchen cabinets for storage in areas other than
              the kitchen?
            </h2>
            <p>
              Yes, acrylic kitchen cabinets are versatile and can be used in
              various parts of the home. Their modular design allows them to be
              adapted for general storage in living areas, bedrooms, or even
              offices, providing a stylish and functional solution.
            </p>
          </div>
          <div className="faq-item">
            <h2>
              Are there acrylic cabinets with adjustable shelves or drawers for
              flexible storage options?
            </h2>
            <p>
              Many acrylic cabinets feature adjustable shelves or drawers,
              offering flexible storage solutions. This adaptability helps you
              customize the interior space to fit different items, ensuring
              efficient use of the available storage.
            </p>
          </div>
          <div className="faq-item">
            <h2>What is the recommended maintenance for acrylic cabinets?</h2>
            <p>Maintaining acrylic cabinets is straightforward:</p>
            <ul>
              <li>Wipe surfaces with a damp cloth to remove dust and dirt.</li>
              <li>Use a mild detergent for tougher stains.</li>
              <li>Avoid abrasive cleaners to prevent scratches.</li>
              <li>
                Regularly check and tighten any hardware like handles or hinges.
              </li>
            </ul>
            <p>
              Following these simple steps will keep your acrylic cabinets
              looking pristine and ensure their longevity.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
