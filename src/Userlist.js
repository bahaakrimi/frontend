import React, { useState, useEffect } from 'react';
import { getAllClient, deleteUserById, searchUserByUsername, addUserClient } from './services/ApiUser';
import { Link } from 'react-router-dom';
import Getcomandlist from './Getcomandlist'
import GetProduit from './GetProduit'
import Userlist from './Userlist'
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    age: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllClient();
      setUsers(response.data.userListe);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchUsers();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await searchUserByUsername(searchTerm);
      setUsers(response.data.userListe);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    try {
      setError(null);
      await deleteUserById(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await addUserClient(newUser);
      setNewUser({
        username: '',
        email: '',
        password: '',
        age: ''
      });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
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

      <h2 className="mb-4 text-center">Gestion des Utilisateurs Clients</h2>

      {/* Formulaire d'ajout */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5>Ajouter un Nouveau Client</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddUser}>
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Nom d'utilisateur</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Âge</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={newUser.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-success">
                  Ajouter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par nom d'utilisateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary" onClick={handleSearch}>
          Rechercher
        </button>
        <button className="btn btn-outline-danger" onClick={() => {
          setSearchTerm('');
          fetchUsers();
        }}>
          Réinitialiser
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          <strong>Erreur :</strong> {error}
          <button className="btn btn-sm btn-warning ms-3" onClick={fetchUsers}>
            Réessayer
          </button>
        </div>
      )}

      {/* Tableau des utilisateurs */}
      {users.length === 0 ? (
        <div className="alert alert-info">Aucun utilisateur client trouvé</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Âge</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
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

export default UserManagement;