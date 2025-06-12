import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function GetCommandes() {
  const navigate = useNavigate();
  const [allCommandes, setAllCommandes] = useState([]);
  const [unseenCommandes, setUnseenCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUnseenOnly, setShowUnseenOnly] = useState(false);
  const lastSeenTime = useRef(localStorage.getItem('lastSeenTime') || new Date().toISOString());

  useEffect(() => {
    fetchCommandes();
    const interval = setInterval(fetchCommandes, 10000); // Vérifie toutes les 10 secondes
    
    // Sauvegarder le temps de la dernière visite quand on quitte la page
    return () => {
      clearInterval(interval);
      localStorage.setItem('lastSeenTime', new Date().toISOString());
    };
  }, []);

  const fetchCommandes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/commande/get');
      const newCommandes = response.data;
      
      // Trouver les nouvelles commandes depuis la dernière visite
      const newUnseen = newCommandes.filter(commande => 
        new Date(commande.createdAt) > new Date(lastSeenTime.current)
      );

      setAllCommandes(newCommandes);
      
      if (newUnseen.length > 0) {
        setUnseenCommandes(newUnseen);
        
        // Afficher notification
        toast.info(
          <div onClick={() => setShowUnseenOnly(true)}>
            {newUnseen.length} nouvelle(s) commande(s) - Cliquez pour voir
          </div>, 
          {
            position: "top-right",
            autoClose: 5000,
            icon: <FaBell />,
          }
        );
      }

      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    setShowUnseenOnly(false);
    // Mettre à jour le dernier moment vu
    lastSeenTime.current = new Date().toISOString();
    localStorage.setItem('lastSeenTime', lastSeenTime.current);
    setUnseenCommandes([]);
  };

  const handleViewUnseen = () => {
    setShowUnseenOnly(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) return;

    try {
      const response = await axios.delete(`http://localhost:5000/commande/delet/${id}`);
      
      if (response.data.message === "Commande supprimee avec succès.") {
        setAllCommandes(prev => prev.filter(c => c._id !== id));
        setUnseenCommandes(prev => prev.filter(c => c._id !== id));
        toast.success("Commande supprimée avec succès!", {
          icon: <FaBell />,
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/commande/up/${id}/status`, { status: newStatus });
      
      setAllCommandes(prev => 
        prev.map(c => c._id === id ? { ...c, status: newStatus } : c)
      );
      setUnseenCommandes(prev => 
        prev.map(c => c._id === id ? { ...c, status: newStatus } : c)
      );
      toast.success("Statut mis à jour!", {
        icon: <FaBell />,
      });
    } catch (err) {
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  const displayedCommandes = showUnseenOnly ? unseenCommandes : allCommandes;

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };



  return (
    <div className="container mt-4">
      <ToastContainer />

             <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
          <Link className="navbar-brand" to="/">Dashboard</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/Userlist">Utilisateurs</Link>
            <Link className="nav-link" to="/GetProduit">Produits</Link>
            <Link className="nav-link" to="/Getcommandadmin">Commandes</Link>
            <button 
  onClick={handleLogout}
  className="btn btn-danger"
>
  Déconnexion
</button>
          </div>
        </nav>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
 
        <h2>Gestion des Commandes</h2>
        <div className="position-relative">
          <button 
            className="btn btn-primary position-relative"
            onClick={handleViewUnseen}
          >
            <FaBell size={20} />
            {unseenCommandes.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {unseenCommandes.length}
              </span>
            )}
          </button>
          <button 
            className="btn btn-outline-primary ms-2"
            onClick={handleViewAll}
          >
            Voir toutes
          </button>
          
        </div>
      </div>

      {displayedCommandes.length === 0 ? (
        <div className="alert alert-info">
          {showUnseenOnly ? "Aucune nouvelle commande" : "Aucune commande disponible"}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Adresse</th>
                <th>Client</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Produits</th>
                <th>Date Création</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedCommandes.map((commande) => (
                <tr key={commande._id}>
                  <td>{commande.model || 'N/A'}</td>
                  <td>{commande.username || 'N/A'}</td>
                  <td>{commande.email || 'N/A'}</td>
                  <td>{commande.tel || 'N/A'}</td>
                  <td>
                    <ul className="list-unstyled">
                      {commande.products?.map((product, index) => (
                        <li key={index}>
                          {product.productName} (x{product.quantity})
                        </li>
                      )) || <li>Aucun produit</li>}
                    </ul>
                  </td>
                  <td>{commande.createdAt ? new Date(commande.createdAt).toLocaleString() : 'N/A'}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={commande.status || 'en_attente'}
                      onChange={(e) => handleStatusChange(commande._id, e.target.value)}
                    >
                      <option value="en_attente">En attente</option>
                      <option value="en_traitement">En traitement</option>
                      <option value="livre">Livré</option>
                      <option value="annule">Annulé</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(commande._id)}
                    >
                      🗑️ Supprimer
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