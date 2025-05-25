import React, { useEffect, useState } from 'react';
import { getTopProducts } from '../services/ApiProduit';
import ProductCard from './ProductCard';

const TopProducts = () => {
    const [tops, setTops] = useState({ top6: [], topByCategory: {} });

    useEffect(() => {
        const loadTops = async () => {
            const data = await getTopProducts();
            setTops(data);
        };
        loadTops();
    }, []);

    return (
        <div className="top-products-section">
            <h2>🏆 TOP 6 DES MEILLEURS PRODUITS</h2>
            <div className="products-grid">
                {tops.top6.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <h2>⭐ TOP PAR CATÉGORIE</h2>
            <div className="category-grid">
                {Object.entries(tops.topByCategory).map(([category, product]) => (
                    <div key={category} className="category-card">
                        <h3>{category.toUpperCase()}</h3>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopProducts;