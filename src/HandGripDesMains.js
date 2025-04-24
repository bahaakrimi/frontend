import React, { useState } from 'react';

const HandGripProductPage = () => {
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
            src="./assets/images/HandGripDesMains.jpg" 
            alt="Hand Grip"
            style={styles.productImage}
          />
          <div>
            <h2 style={styles.productTitle}>Hand Grip Des Mains</h2>
            <p style={styles.productSubtitle}>(Renforceur de poignet et avant-bras)</p>
          </div>
        </div>
        
        <div style={styles.brandSection}>
          <p><strong>Marque:</strong> FitnessPro | Accessoires de sport</p>
        </div>

        <div style={styles.priceSection}>
          <span style={styles.currentPrice}>25.00 DT</span>
          <span style={styles.originalPrice}>35.00 DT</span>
          <span style={styles.discount}>-29%</span>
        </div>

        <div style={styles.stockInfo}>
          <p>① 12 articles seulement</p>
          <p>+ livraison gratuite</p>
        </div>

        <div style={styles.reviewSection}>
          <p>(23 avis vérifiés) ★★★★☆</p>
        </div>

        {/* Quick specs (shown by default) */}
        <div style={styles.quickSpecs}>
          <p><strong>Type:</strong> Renforceur manuel réglable</p>
          <p><strong>Résistance:</strong> 10-40 kg ajustable</p>
          <p><strong>Matériau:</strong> Plastique ABS + caoutchouc</p>
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
                <strong>Fonction:</strong> Renforcement musculaire main/poignet
              </div>
              <div style={styles.specItem}>
                <strong>Niveaux de résistance:</strong> 5 niveaux ajustables
              </div>
              <div style={styles.specItem}>
                <strong>Dimensions:</strong> 18 x 8 x 5 cm
              </div>
              <div style={styles.specItem}>
                <strong>Poids:</strong> 350g
              </div>
              <div style={styles.specItem}>
                <strong>Couleurs disponibles:</strong> Noir, Rouge, Bleu
              </div>
              <div style={styles.specItem}>
                <strong>Utilisation:</strong> Fitness, rééducation, bureau
              </div>
              <div style={styles.specItem}>
                <strong>Avantages:</strong> Anti-dérapant, ergonomique
              </div>
              <div style={styles.specItem}>
                <strong>Public cible:</strong> Débutants à professionnels
              </div>
              <div style={styles.specItem}>
                <strong>Garantie:</strong> 6 mois
              </div>
            </div>

            <div style={styles.promotionsSection}>
              <h4>AVANTAGES DU PRODUIT</h4>
              <ul style={styles.promotionsList}>
                <li>Améliore la force de préhension et l'endurance</li>
                <li>Réduit les risques de blessures aux poignets</li>
                <li>Idéal pour la rééducation après blessure</li>
                <li>Peut être utilisé n'importe où (bureau, maison, salle de sport)</li>
                <li>Guide d'exercices inclus</li>
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

export default HandGripProductPage;