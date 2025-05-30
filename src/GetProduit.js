import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProduitManager = () => {
   const navigate = useNavigate();
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

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };


  return (
    <>
      <style>{`
        /* Styles généraux */
        .produit-manager {
          font-family: 'Arial', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .loading, .error {
          text-align: center;
          padding: 50px;
          font-size: 18px;
        }

        /* Navigation */
        .navbar {
          margin-bottom: 30px;
          border-radius: 5px;
        }

        .navbar-brand {
          font-weight: bold;
          font-size: 1.5rem;
        }

        .nav-link {
          margin-right: 15px;
          font-size: 1.1rem;
          color: rgba(255,255,255,.5);
        }

        .nav-link:hover {
          color: rgba(255,255,255,.75);
        }

        /* Formulaire */
        .add-produit-form {
          background-color: #f8f9fa;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .add-produit-form h2 {
          margin-bottom: 20px;
          color: #343a40;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .form-group input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 16px;
        }

        .form-actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        .btn-primary {
          background-color: #007bff;
          color: white;
        }

        .btn-primary:hover {
          background-color: #0069d9;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #5a6268;
        }

        /* Image preview */
        .image-preview {
          margin-top: 10px;
        }

        .image-preview img {
          max-width: 200px;
          max-height: 200px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 10px;
        }

        .image-preview p {
          font-size: 12px;
          color: #6c757d;
          margin-top: 5px;
        }

        /* Liste des produits */
        .produit-list h2 {
          margin-bottom: 20px;
          color: #343a40;
        }

        .produit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .produit-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .produit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .produit-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .produit-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .promo-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #dc3545;
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
        }

        .produit-info {
          padding: 15px;
        }

        .produit-info h3 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #343a40;
        }

        .price-container {
          margin-bottom: 10px;
        }

        .original-price {
          text-decoration: line-through;
          color: #6c757d;
          margin-right: 10px;
        }

        .promo-price {
          color: #dc3545;
          font-weight: bold;
        }

        .produit-actions {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          border-top: 1px solid #eee;
        }

        .btn-warning {
          background-color: #ffc107;
          color: #212529;
        }

        .btn-warning:hover {
          background-color: #e0a800;
        }

        .btn-danger {
          background-color: #dc3545;
          color: white;
        }

        .btn-danger:hover {
          background-color: #c82333;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .produit-grid {
            grid-template-columns: 1fr;
          }
          
          .navbar-nav {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .nav-link {
            margin-bottom: 5px;
          }
        }
      `}</style>

      <div className="produit-manager">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
          <Link className="navbar-brand" to="/">Dashboard</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/Userlist">Utilisateurs</Link>
            <Link className="nav-link" to="/GetProduit">Produits</Link>
            <Link className="nav-link" to="/Getcomandlist">Commandes</Link>
            <button 
              onClick={handleLogout}
              
            >
              Déconnexion
            </button>
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
    </>
  );
};

export default ProduitManager;