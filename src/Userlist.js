import React, { useState, useEffect } from 'react';
import { getAllClient, deleteUserById, searchUserByUsername, addUserClient } from './services/ApiUser';
import { Link } from 'react-router-dom';
import Getcomandlist from './Getcomandlist'
import GetProduit from './GetProduit'
import Userlist from './Userlist'

import { useNavigate } from 'react-router-dom';
function UserManagement() {

  const navigate = useNavigate();
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


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Dashboard</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/Userlist">Utilisateurs</Link>
        <Link className="nav-link" to="/GetProduit">Produits</Link>
        <Link className="nav-link" to="/Getcomandlist">Commandes</Link>
        <button 
  onClick={handleLogout}
  className="btn btn-danger"
>
  Déconnexion
</button>
      </div>
    </nav>

      <h2 className="mb-4 text-center">Gestion des Utilisateurs Clients</h2>

     

  

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
                <th>tel</th>
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

export default UserManagement;