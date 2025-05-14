// ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card" style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '10px',
            width: '250px'
        }}>
            <img 
                src={product.imageUrl} 
                alt={product.nom} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h3>{product.nom}</h3>
            <p style={{ fontWeight: 'bold', color: '#333' }}>{product.prix} TND</p>
            <p>Disponible: {product.quantite} unités</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button style={{
                    padding: '8px 12px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Ajouter une commande
                </button>
                <button style={{
                    padding: '8px 12px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
};

export default ProductCard;