import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`}>
                <div className="product-image-container">
                    {/* Remplacez par votre image réelle */}
                    <img 
                        src={product.image || '/images/placeholder-product.png'} 
                        alt={product.name}
                        className="product-image"
                    />
                </div>
                <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                            <span 
                                key={i} 
                                className={`star ${i < product.rating ? 'filled' : ''}`}
                            >
                                {i < product.rating ? '★' : '☆'}
                            </span>
                        ))}
                        <span className="rating-value">({product.rating}/5)</span>
                    </div>
                    <p className="product-price">{product.price} TND</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;