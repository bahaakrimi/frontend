import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../services/ApiProduit';
import ProductCard from './ProductCard';

const ProductRecommendations = ({ productId }) => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const loadRecs = async () => {
            const recs = await getRecommendations(productId);
            setRecommendations(recs);
        };
        loadRecs();
    }, [productId]);

    return (
        <div className="recommendations-section">
            <h3>Produits similaires</h3>
            <div className="recommendations-grid">
                {recommendations.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductRecommendations;