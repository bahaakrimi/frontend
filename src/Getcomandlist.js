import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCommande, deleteCommandeById, updateCommande } from './services/ApiCommandes';

function GetCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCommande();
      setCommandes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) return;

    try {
      setError(null);
      await deleteCommandeById(id);
      setCommandes(commandes.filter(commande => commande._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setError(null);
      const updatedCommande = await updateCommande(id, { status: newStatus });
      
      setCommandes(commandes.map(commande => 
        commande._id === id ? updatedCommande.data : commande
      ));
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
        <button className="btn btn-sm btn-warning ms-3" onClick={fetchCommandes}>
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
      <h2 className="mb-4 text-center">Gestion des Commandes</h2>

      {/* Tableau des commandes */}
      {commandes.length === 0 ? (
        <div className="alert alert-info">Aucune commande disponible</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Modèle</th>
                <th>nombre de pièces  déclarer</th>
                <th>nomclient</th>
                <th>Email</th>
                <th>Date Création</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande) => (
                <tr key={commande._id}>
                  <td>{commande.model}</td>
                  <td>{commande.prix} pièces</td>
                  <td>{commande.matricule}</td>
                  <td>{commande.email}</td>
                  <td>{new Date(commande.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={commande.status || 'en_attente'}
                      onChange={(e) => handleStatusChange(commande._id, e.target.value)}
                    >
                      <option value="en_attente">En attente</option>
                      <option value="en_traitement">En traitement</option>
                      <option value="livre">Livré</option>
                      <option value="annulé">Annulé</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(commande._id)}
                    >
                      Supprimer
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

export default GetCommandes;