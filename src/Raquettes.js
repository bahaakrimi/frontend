import React, { useState } from 'react';

const RacquetProductPage = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Store header */}
      <div style={styles.storeHeader}>
        Boutique Officielle 0522041818 pour commander
      </div>

      {/* Product card */}
      <div style={styles.productCard}>
        {/* Image + title section */}
        <div style={styles.imageSection}>
          <img 
            src="./assets/images/raquettes.jpg" 
            alt="Tennis Racquet"
            style={styles.productImage}
          />
          <div>
            <h2 style={styles.productTitle}>Raquette de Tennis Professionnelle</h2>
            <p style={styles.productSubtitle}>(Corde incluse + étui de protection)</p>
          </div>
        </div>
        
        <div style={styles.brandSection}>
          <p><strong>Marque:</strong> TennisPro | Produits similaires</p>
        </div>

        <div style={styles.priceSection}>
          <span style={styles.currentPrice}>35.00 DT</span>
          <span style={styles.originalPrice}>50.00 DT</span>
          <span style={styles.discount}>-30%</span>
        </div>

        <div style={styles.stockInfo}>
          <p>① 7 articles seulement</p>
          <p>+ livraison gratuite</p>
        </div>

        <div style={styles.reviewSection}>
          <p>(15 avis vérifiés) ★★★★☆</p>
        </div>

        {/* Quick specs (shown by default) */}
        <div style={styles.quickSpecs}>
          <p><strong>Poids:</strong> 300g (non cordée)</p>
          <p><strong>Taille:</strong> 27 pouces (standard adulte)</p>
          <p><strong>Équilibre:</strong> 320mm (tête légère)</p>
        </div>

        <button style={styles.buyButton}>J'achète</button>

        {/* Button to show/hide details */}
        <button 
          onClick={toggleDetails} 
          style={styles.seeMoreButton}
        >
          {showDetails ? 'Voir moins' : 'Voir plus de détails'}
        </button>

        {/* Detailed section (conditionally shown) */}
        {showDetails && (
          <div style={styles.detailsSection}>
            <h3 style={styles.detailsTitle}>Fiche technique complète</h3>
            
            <div style={styles.specsGrid}>
              <div style={styles.specItem}>
                <strong>Type:</strong> Raquette de tennis performance
              </div>
              <div style={styles.specItem}>
                <strong>Matériau cadre:</strong> Graphite 100%
              </div>
              <div style={styles.specItem}>
                <strong>Surface de frappe:</strong> 645 cm²
              </div>
              <div style={styles.specItem}>
                <strong>Tension recommandée:</strong> 22-26 kg
              </div>
              <div style={styles.specItem}>
                <strong>Profil du cadre:</strong> 22mm
              </div>
              <div style={styles.specItem}>
                <strong>Motif des cordes:</strong> 16x19
              </div>
              <div style={styles.specItem}>
                <strong>Niveau:</strong> Intermédiaire à avancé
              </div>
              <div style={styles.specItem}>
                <strong>Couleur:</strong> Noir avec accents rouges
              </div>
              <div style={styles.specItem}>
                <strong>Garantie:</strong> 1 an
              </div>
            </div>

            <div style={styles.promotionsSection}>
              <h4>PROMOTIONS ET ACCESSOIRES</h4>
              <ul style={styles.promotionsList}>
                <li>Corde synthétique incluse (valeur 15 DT)</li>
                <li>Étui de protection thermique offert</li>
                <li>Poignée absorbante OverGrip incluse</li>
                <li>Service de cordage gratuit (première fois)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles (same as before)
const styles = {
  pageContainer: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9'
  },
  storeHeader: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '0.9em'
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  imageSection: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '15px'
  },
  productImage: {
    width: '150px',
    height: 'auto',
    objectFit: 'contain',
    border: '1px solid #eee',
    borderRadius: '5px'
  },
  productTitle: {
    color: '#333',
    fontSize: '1.3em',
    marginBottom: '5px'
  },
  productSubtitle: {
    color: '#666',
    fontSize: '0.9em',
    marginBottom: '0'
  },
  brandSection: {
    margin: '10px 0',
    color: '#555',
    fontSize: '0.95em'
  },
  priceSection: {
    margin: '15px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  currentPrice: {
    fontSize: '1.8em',
    color: '#e63946',
    fontWeight: 'bold'
  },
  originalPrice: {
    fontSize: '1.2em',
    color: '#999',
    textDecoration: 'line-through'
  },
  discount: {
    backgroundColor: '#e63946',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.9em'
  },
  stockInfo: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '0.9em',
    margin: '15px 0'
  },
  reviewSection: {
    color: '#666',
    fontSize: '0.9em',
    margin: '10px 0'
  },
  quickSpecs: {
    margin: '15px 0',
    lineHeight: '1.6'
  },
  buyButton: {
    backgroundColor: '#2a9d8f',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '5px',
    fontSize: '1.1em',
    cursor: 'pointer',
    width: '100%',
    margin: '10px 0',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#21867a'
    }
  },
  seeMoreButton: {
    backgroundColor: 'transparent',
    color: '#2a9d8f',
    border: '1px solid #2a9d8f',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px 0',
    fontSize: '0.9em',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#f0f9f8'
    }
  },
  detailsSection: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
    animation: 'fadeIn 0.3s ease-in'
  },
  detailsTitle: {
    color: '#333',
    marginBottom: '15px'
  },
  specsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginBottom: '20px'
  },
  specItem: {
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    fontSize: '0.9em'
  },
  promotionsSection: {
    backgroundColor: '#fff8e1',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '15px'
  },
  promotionsList: {
    paddingLeft: '20px',
    margin: '10px 0'
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  }
};

export default RacquetProductPage;