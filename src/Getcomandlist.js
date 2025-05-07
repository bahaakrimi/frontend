import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCommande, deleteCommandeById, updateCommande } from './services/ApiCommandes';

function GetCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    model: '',
    prix: '',
    matricule: ''
  });

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

  const handleEdit = (commande) => {
    setEditingId(commande._id);
    setFormData({
      model: commande.model,
      prix: commande.prix,
      matricule: commande.matricule
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await updateCommande(formData, editingId);
      setEditingId(null);
      fetchCommandes();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

      {/* Formulaire de mise à jour */}
      {editingId && (
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h5>Modifier Commande</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Modèle</label>
                  <input
                    type="text"
                    className="form-control"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Prix</label>
                  <input
                    type="number"
                    className="form-control"
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Matricule</label>
                  <input
                    type="text"
                    className="form-control"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="submit" className="btn btn-success me-2">
                    Mettre à jour
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tableau des commandes */}
      {commandes.length === 0 ? (
        <div className="alert alert-info">Aucune commande disponible</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Modèle</th>
                <th>Prix</th>
                <th>Matricule</th>
                <th>Date Création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande) => (
                <tr key={commande._id}>
                  <td>{commande.model}</td>
                  <td>{commande.prix} €</td>
                  <td>{commande.matricule}</td>
                  <td>{new Date(commande.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(commande)}
                    >
                      Modifier
                    </button>
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