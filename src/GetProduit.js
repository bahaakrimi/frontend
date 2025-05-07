import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProduits, deleteProduit } from './services/ApiProduit';

function GetProduit() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduits();
  }, []);

  const fetchProduits = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllProduits();
      setProduits(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      setError(null);
      await deleteProduit(id);
      setProduits(produits.filter(produit => produit._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-3">
        <strong>Erreur :</strong> {error}
        <button className="btn btn-sm btn-warning ms-3" onClick={fetchProduits}>
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Dashboard</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/Userlist">Utilisateurs</Link>
        <Link className="nav-link" to="/GetProduit">Produits</Link>
        <Link className="nav-link" to="/Getcomandlist">Commandes</Link>
      </div>
    </nav>
      <h2 className="mb-4 text-center">Liste des Produits</h2>
      
      {produits.length === 0 ? (
        <div className="alert alert-info">Aucun produit disponible</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Créé le</th>
                <th>Modifié le</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <tr key={produit._id}>
                  <td>{produit.name}</td>
                  <td>{produit.price} €</td>
                  <td>{new Date(produit.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(produit.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(produit._id)}
                      disabled={loading}
                    >
                      {loading ? 'Suppression...' : 'Supprimer'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GetProduit;