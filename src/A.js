import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllProduits } from './services/ApiProduit';
const Fashion = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await getAllProduits(); // Utilisez votre fonction d'API
        setProduits(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProduits();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Man & Woman Fashion</h1>
      
      {produits.map((produit) => (
        <div key={produit._id}>
          <h2>{produit.name}</h2>
          <p>Price ${produit.price}</p>
          <button>Buy Now</button>
          <button>See More</button>
        </div>
      ))}
    </div>
  );
};

export default Fashion;