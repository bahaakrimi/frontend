import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ProductPage = () => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const navigate = useNavigate();
    
    const handleBuyNowClick = () => {
        // Redirection vers la page de paiement
        navigate('/cmande');
    };

  return (
    <div style={styles.pageContainer}>
      {/* En-tête de la boutique */}
      <div style={styles.storeHeader}>
        Boutique Officielle 0522041818 pour commander
      </div>

      {/* Carte produit principale */}
      <div style={styles.productCard}>
        {/* Section image + titre */}
        <div style={styles.imageSection}>
          <img 
            src="./assets/images/kangan-img.png" 
            alt="Kangan"
            style={styles.productImage}
          />
          <div>
            <h2 style={styles.productTitle}>Kangan - Bracelet traditionnel</h2>
            <p style={styles.productSubtitle}>(Livraison gratuite)</p>
          </div>
        </div>
        
        <div style={styles.brandSection}>
          <p><strong>Marque:</strong> Artisanat Traditionnel | Produits similaires</p>
        </div>

        <div style={styles.priceSection}>
          <span style={styles.currentPrice}>500.00 Dt</span>
          <span style={styles.originalPrice}>650.00 Dt</span>
          <span style={styles.discount}>-23%</span>
        </div>

        <div style={styles.stockInfo}>
          <p>① 5 articles seulement</p>
          <p>+ livraison gratuite partout en Tunisie</p>
        </div>

        <div style={styles.reviewSection}>
          <p>(3 avis vérifiés)</p>
        </div>

        {/* Section réduite (affichée par défaut) */}
        <div style={styles.quickSpecs}>
          <p><strong>Matériau:</strong> Argent 925</p>
          <p><strong>Taille:</strong> Ajustable</p>
        </div>

        <button style={styles.buyButton} onClick={handleBuyNowClick}>J'achète</button>

        {/* Bouton pour afficher/masquer les détails */}
        <button 
          onClick={toggleDetails} 
          style={styles.seeMoreButton}
        >
          {showDetails ? 'Voir moins' : 'Voir plus de détails'}
        </button>

        {/* Section détaillée (affichée conditionnellement) */}
        {showDetails && (
          <div style={styles.detailsSection}>
            <h3 style={styles.detailsTitle}>Fiche technique complète</h3>
            
            <div style={styles.specsGrid}>
              <div style={styles.specItem}>
                <strong>Modèle:</strong> Kangan-TN-2024
              </div>
              <div style={styles.specItem}>
                <strong>Code produit:</strong> KGN-925-ADJ
              </div>
              <div style={styles.specItem}>
                <strong>Métal:</strong> Argent 925 (92.5% pur)
              </div>
              <div style={styles.specItem}>
                <strong>Poids:</strong> environ 25g
              </div>
              <div style={styles.specItem}>
                <strong>Taille:</strong> Ajustable (18-20cm)
              </div>
              <div style={styles.specItem}>
                <strong>Style:</strong> Traditionnel tunisien
              </div>
              <div style={styles.specItem}>
                <strong>Finition:</strong> Poli miroir
              </div>
              <div style={styles.specItem}>
                <strong>Garantie:</strong> 1 an
              </div>
            </div>

            <div style={styles.promotionsSection}>
              <h4>PROMOTIONS</h4>
              <ul style={styles.promotionsList}>
                <li>Livraison gratuite</li>
                <li>Boîte cadeau offerte</li>
                <li>Certificat d'authenticité inclus</li>
                <li>Service de gravure disponible</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles intégrés avec ajout pour l'image
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

export default ProductPage;