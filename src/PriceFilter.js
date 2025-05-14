// PriceFilter.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PriceFilter = ({ onFilter }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleFilter = async () => {
        try {
            const response = await axios.get('http://localhost:5000/produit/filter', {
                params: { minPrice, maxPrice }
            });
            onFilter(response.data);
        } catch (error) {
            console.error("Erreur de filtrage:", error);
        }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
        }}>
            <h3 style={{ margin: '0' }}>Filtrer par prix (TND)</h3>
            <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Minimum:</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Maximum:</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />
            </div>
            <button 
                onClick={handleFilter}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    alignSelf: 'flex-end'
                }}
            >
                Filtrer
            </button>
        </div>
    );
};

export default PriceFilter;