import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Produit.css';
import { Link } from 'react-router-dom';

const ProduitManager = () => {
  // États pour la liste des produits
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    nbrproduit: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Récupérer les produits
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/produit/with-images');
        setProduits(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestion du fichier image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
    
    // Prévisualisation de l'image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('nbrproduit', formData.nbrproduit);
    data.append('image_produit', formData.image);

    try {
      const response = await axios.post(
        'http://localhost:5000/produit/addProduitWithImg', 
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Ajouter le nouveau produit à la liste
      setProduits([...produits, {
        ...response.data,
        imageUrl: `${window.location.origin}/files/${response.data.image}`
      }]);
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        price: '',
        category: '',
        nbrproduit: '',
        image: null
      });
      setPreviewImage(null);
      
      alert('Produit ajouté avec succès!');
    } catch (err) {
      console.error('Erreur lors de l\'ajout du produit:', err);
      alert('Erreur lors de l\'ajout du produit');
    }
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="produit-manager">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/Userlist">Utilisateurs</Link>
          <Link className="nav-link" to="/GetProduit">Produits</Link>
          <Link className="nav-link" to="/Getcomandlist">Commandes</Link>
        </div>
      </nav>
      {/* Formulaire d'ajout */}
      <div className="add-produit-form">
        <h2>Ajouter un nouveau produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom du produit:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Prix:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label>Catégorie:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Quantité disponible:</label>
            <input
              type="number"
              name="nbrproduit"
              value={formData.nbrproduit}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>Image du produit:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
          </div>
          
          <button type="submit" className="submit-btn">Ajouter le produit</button>
        </form>
      </div>

      {/* Liste des produits */}
      <div className="produit-list">
        <h2>Nos produits</h2>
        <div className="produit-grid">
          {produits.map((produit) => (
            <div key={produit._id} className="produit-card">
              <div className="produit-image-container">
                <img 
                  src={produit.imageUrl} 
                  alt={produit.name} 
                  className="produit-image"
                  onError={(e) => {
                    e.target.src = 'http://localhost:5000/files/default-product.png';
                  }}
                />
              </div>
              <div className="produit-info">
                <h3>{produit.name}</h3>
                <p>Prix: ${produit.price}</p>
                <p>Catégorie: {produit.category}</p>
                <p>Stock: {produit.nbrproduit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProduitManager;