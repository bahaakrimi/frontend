// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>GET START</h1>
        <h2>YOUR FAVORITE SHOPING</h2>
        <Link to="/panier" className="cta-button">Voir le panier</Link>
      </section>

      <div className="product-grid">
        <div className="product-card">
          <h3>Produit 1</h3>
          <Link to="/panier" className="buy-button">Buy Now</Link>
        </div>
        <div className="product-card">
          <h3>Produit 2</h3>
          <Link to="/panier" className="buy-button">Buy Now</Link>
        </div>
        <div className="product-card">
          <h3>Produit 3</h3>
          <Link to="/panier" className="buy-button">Buy Now</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;