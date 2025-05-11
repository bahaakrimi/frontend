import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const JeuxPage = () => {
  const [jeux, setJeux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJeux = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produit/with-images');
        const jeuxProduits = response.data.filter(produit => produit.category === 'jeux');
        setJeux(jeuxProduits);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJeux();
  }, []);

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="jeux-page">
      <header className="jeux-header">
        <h1>Jeux Vidéo</h1>
        <p>Découvrez notre sélection de manettes et accessoires gaming</p>
      </header>

      <div className="jeux-container">
        {jeux.map(jeu => (
          <div key={jeu._id} className={`jeu-card ${jeu.promotion === 'oui' ? 'promo' : ''}`}>
            {jeu.promotion === 'oui' && (
              <div className="promo-banner">EN PROMOTION</div>
            )}
            
            <div className="jeu-image-container">
              <img 
                src={jeu.imageUrl} 
                alt={jeu.name}
                onError={(e) => {
                  e.target.src = 'http://localhost:5000/files/default-product.png';
                }}
              />
            </div>
            
            <div className="jeu-info">
              <h3>{jeu.name}</h3>
              
              <div className="jeu-pricing">
                {jeu.promotion === 'oui' ? (
                  <>
                    <span className="original-price">{jeu.price} TND</span>
                    <span className="promo-price">{jeu.promotionprice} TND</span>
                  </>
                ) : (
                  <span className="normal-price">{jeu.price} TND</span>
                )}
              </div>
              
              <div className="jeu-stock">
                Disponible: {jeu.nbrproduit} unités
              </div>
              
              <div className="jeu-actions">
                <button className="buy-btn">Acheter</button>
                <Link to={`/produit/${jeu._id}`} className="details-btn">Détails</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JeuxPage;