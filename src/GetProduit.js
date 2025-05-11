import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Produit.css';
import { Link } from 'react-router-dom';

const ProduitManager = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    promotionprice: '',
    category: '',
    promotion: '',
    nbrproduit: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProduits();
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handleEdit = (produit) => {
    setEditingId(produit._id);
    setFormData({
      name: produit.name,
      price: produit.price,
      promotionprice: produit.promotionprice,
      category: produit.category,
      promotion: produit.promotion,
      nbrproduit: produit.nbrproduit,
      image: null
    });
    setPreviewImage(produit.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '', 
      price: '', 
      promotionprice: '',
      category: '', 
      promotion: '', 
      nbrproduit: '', 
      image: null
    });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('promotionprice', formData.promotionprice);
    data.append('category', formData.category);
    data.append('promotion', formData.promotion);
    data.append('nbrproduit', formData.nbrproduit);
    if (formData.image) data.append('image_produit', formData.image);

    try {
      if (editingId) {
        const response = await axios.put(
          `http://localhost:5000/produit/updateProduit/${editingId}`, 
          data,
          { 
            headers: { 
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            } 
          }
        );
        
        setProduits(produits.map(p => 
          p._id === editingId ? { 
            ...response.data,
            imageUrl: response.data.imageUrl || p.imageUrl
          } : p
        ));
        alert('Produit mis à jour avec succès!');
      } else {
        const response = await axios.post(
          'http://localhost:5000/produit/addProduitWithImg', 
          data,
          { 
            headers: { 
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            } 
          }
        );
        setProduits([...produits, {
          ...response.data,
          imageUrl: `/files/${response.data.image}`
        }]);
        alert('Produit ajouté avec succès!');
      }
      cancelEdit();
    } catch (err) {
      console.error('Erreur:', err);
      alert(`Erreur: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await axios.delete(`http://localhost:5000/produit/deleteProduit/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProduits(produits.filter(p => p._id !== id));
        alert('Produit supprimé avec succès!');
      } catch (err) {
        console.error('Erreur:', err);
        alert(`Erreur lors de la suppression: ${err.response?.data?.message || err.message}`);
      }
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
      
      <div className="add-produit-form">
        <h2>{editingId ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</h2>
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
            <label>Prix promotionnel:</label>
            <input 
              type="number" 
              name="promotionprice" 
              value={formData.promotionprice} 
              onChange={handleChange} 
              min="0" 
              step="0.01" 
            />
          </div>
          
          <div className="form-group">
            <label>Promotion (%):</label>
            <input 
              type="text" 
              name="promotion" 
              value={formData.promotion} 
              onChange={handleChange} 
              min="0" 
              max="100" 
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
              required={!editingId} 
            />
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
                {editingId && <p>Laisser vide pour conserver l'image actuelle</p>}
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={cancelEdit}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="produit-list">
        <h2>Nos produits</h2>
        <div className="produit-grid">
          {produits.map(produit => {
            const displayPrice = produit.promotionprice || produit.price;
            
            return (
              <div key={produit._id} className="produit-card">
                <div className="produit-image-container">
                  <img 
                    src={produit.imageUrl} 
                    alt={produit.name}
                    onError={(e) => {
                      e.target.src = 'http://localhost:5000/files/default-product.png';
                    }}
                  />
                  {produit.promotion > 0 && (
                    <div className="promo-badge">-{produit.promotion}%</div>
                  )}
                </div>
                <div className="produit-info">
                  <h3>{produit.name}</h3>
                  <div className="price-container">
                    {produit.promotionprice ? (
                      <>
                        <span className="original-price">${produit.price}</span>
                        <span className="promo-price">${produit.promotionprice}</span>
                      </>
                    ) : (
                      <span>${produit.price}</span>
                    )}
                  </div>
                  <p>Catégorie: {produit.category}</p>
                  <p>Stock: {produit.nbrproduit}</p>
                </div>
                <div className="produit-actions">
                  <button 
                    className="btn btn-warning"
                    onClick={() => handleEdit(produit)}
                  >
                    Modifier
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(produit._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProduitManager;