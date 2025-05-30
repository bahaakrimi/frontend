import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const navigate = useNavigate();

  // Styles CSS modernes
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Segoe UI', 'Roboto', sans-serif",
      color: '#333'
    },
    header: {
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #f0f0f0',
      textAlign: 'center'
    },
    title: {
      fontSize: '2rem',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      fontWeight: '600'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#7f8c8d',
      marginBottom: '1rem'
    },
    sectionTitle: {
      fontSize: '1.4rem',
      color: '#2c3e50',
      margin: '2.5rem 0 1.2rem 0',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #f0f0f0',
      fontWeight: '500'
    },
    infoContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.2rem'
    },
    fieldGroup: {
      marginBottom: '1.2rem'
    },
    label: {
      display: 'block',
      fontSize: '0.95rem',
      fontWeight: '500',
      color: '#7f8c8d',
      marginBottom: '0.4rem'
    },
    value: {
      display: 'block',
      width: '100%',
      padding: '0.8rem 1rem',
      fontSize: '1rem',
      backgroundColor: '#f9f9f9',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      color: '#34495e'
    },
    input: {
      width: '100%',
      padding: '0.8rem 1rem',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#fff',
      transition: 'all 0.2s ease',
      marginBottom: '0.5rem',
      boxSizing: 'border-box'
    },
    roleBadge: {
      display: 'inline-block',
      padding: '0.4rem 0.8rem',
      backgroundColor: '#e8f4fc',
      borderRadius: '20px',
      color: '#2980b9',
      fontWeight: '600',
      fontSize: '0.85rem',
      marginTop: '0.5rem',
      textTransform: 'capitalize'
    },
    statsContainer: {
      backgroundColor: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '8px',
      marginTop: '1.5rem'
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.6rem 0',
      borderBottom: '1px solid #eee'
    },
    statLabel: {
      color: '#7f8c8d',
      fontWeight: '500'
    },
    statValue: {
      color: '#2c3e50',
      fontWeight: '600'
    },
    message: {
      padding: '1rem',
      borderRadius: '8px',
      margin: '1.5rem 0',
      fontSize: '1rem',
      fontWeight: '500',
      textAlign: 'center'
    },
    error: {
      backgroundColor: '#fde8e8',
      color: '#e74c3c',
      border: '1px solid #f5c6cb'
    },
    success: {
      backgroundColor: '#e8f8f0',
      color: '#27ae60',
      border: '1px solid #c3e6cb'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2.5rem',
      justifyContent: 'center'
    },
    button: {
      padding: '0.8rem 1.8rem',
      fontSize: '1rem',
      fontWeight: '600',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      minWidth: '180px'
    },
    primaryButton: {
      backgroundColor: '#3498db',
      color: 'white'
    },
    successButton: {
      backgroundColor: '#2ecc71',
      color: 'white'
    },
    dangerButton: {
      backgroundColor: '#e74c3c',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#f8f9fa',
      color: '#34495e',
      border: '1px solid #ddd'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem',
      fontSize: '1.2rem',
      color: '#7f8c8d'
    },
    orderContainer: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '1rem'
    },
    orderItem: {
      padding: '1rem',
      borderBottom: '1px solid #eee',
      marginBottom: '0.5rem'
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem'
    },
    orderStatus: {
      padding: '0.3rem 0.6rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '600'
    },
    '@media (max-width: 768px)': {
      container: {
        margin: '1rem',
        padding: '1.5rem'
      },
      title: {
        fontSize: '1.6rem'
      },
      buttonGroup: {
        flexDirection: 'column',
        alignItems: 'center'
      },
      button: {
        width: '100%'
      }
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);
          setFormData({
            username: user.username,
            email: user.email,
            age: user.age || ''
          });
          
          // Charger les commandes si l'utilisateur en a
          if (user.commandes && user.commandes.length > 0) {
            await loadUserOrders(user.commandes);
          }
        } else {
          navigate('/login');
        }
      } catch (err) {
        setError('Erreur de chargement des données utilisateur');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const loadUserOrders = async (orderIds) => {
    try {
      setOrdersLoading(true);
      const ordersPromises = orderIds.map(async (orderId) => {
        const response = await fetch(`http://localhost:5000/commande/getCommandeById/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de la commande');
        }
        
        return await response.json();
      });
      
      const ordersData = await Promise.all(ordersPromises);
      setOrders(ordersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleEditClick = () => {
    setFormData({
      username: userData.username,
      email: userData.email,
      age: userData.age || ''
    });
    setEditing(true);
  };

  const handleSave = async () => {
    if (!formData.username.trim()) {
      setError('Le nom d\'utilisateur est obligatoire');
      return;
    }
    if (!formData.email.trim()) {
      setError('L\'email est obligatoire');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Veuillez entrer un email valide');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await fetch(`http://localhost:5000/users/updateuserById/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          age: formData.age || null
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || 'Échec de la mise à jour');
        } catch {
          throw new Error(errorText || 'Échec de la mise à jour');
        }
      }

      const result = await response.json();
      let updatedUser;
      if (Array.isArray(result) && result.length > 0) {
        updatedUser = result[0];
      } else if (result.user) {
        updatedUser = result.user;
      } else {
        updatedUser = result;
      }

      if (!updatedUser) {
        throw new Error('Réponse serveur invalide - format de données non reconnu');
      }

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setEditing(false);
      setSuccess('Profil mis à jour avec succès');
      setFormData({
        username: updatedUser.username,
        email: updatedUser.email,
        age: updatedUser.age || ''
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'en_attente':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case 'livrée':
        return { backgroundColor: '#d4edda', color: '#155724' };
      case 'annulée':
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      default:
        return { backgroundColor: '#d1ecf1', color: '#0c5460' };
    }
  };

  if (loading && !editing) return <div style={styles.loading}>Chargement...</div>;
  if (!userData) return <div style={styles.container}>Utilisateur non trouvé</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{userData.username}</h1>
        <p style={styles.subtitle}>{userData.email}</p>
        <div style={styles.roleBadge}>Rôle: {userData.role}</div>
      </div>

      {error && <div style={{...styles.message, ...styles.error}}>{error}</div>}
      {success && <div style={{...styles.message, ...styles.success}}>{success}</div>}

      <h2 style={styles.sectionTitle}>Informations personnelles</h2>
      
      <div style={styles.infoContainer}>
        <div style={styles.fieldGroup}>
          <span style={styles.label}>Nom d'utilisateur:</span>
          {editing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              style={styles.input}
              disabled={loading}
            />
          ) : (
            <div style={styles.value}>{userData.username || '-'}</div>
          )}
        </div>

        <div style={styles.fieldGroup}>
          <span style={styles.label}>Email:</span>
          {editing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={styles.input}
              disabled={loading}
            />
          ) : (
            <div style={styles.value}>{userData.email || '-'}</div>
          )}
        </div>

        <div style={styles.fieldGroup}>
          <span style={styles.label}>Tel:</span>
          {editing ? (
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              style={styles.input}
              disabled={loading}
            />
          ) : (
            <div style={styles.value}>{userData.age || 'Non spécifié'}</div>
          )}
        </div>
      </div>

      <div style={styles.statsContainer}>
        <h2 style={styles.sectionTitle}>Statistiques</h2>
        <div style={styles.fieldGroup}>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Membre depuis:</span>
            <span style={styles.statValue}>
              {userData.createdAt ? formatDate(userData.createdAt) : 'Non disponible'}
            </span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Dernière mise à jour:</span>
            <span style={styles.statValue}>
              {userData.updatedAt ? formatDate(userData.updatedAt) : 'Non disponible'}
            </span>
          </div>
          <div style={{...styles.statItem, borderBottom: 'none'}}>
            <span style={styles.statLabel}>Commandes passées:</span>
            <span style={styles.statValue}>{userData.commandes ? userData.commandes.length : 0}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={styles.sectionTitle}>Historique des commandes</h2>
        
        {ordersLoading ? (
          <div style={styles.loading}>Chargement des commandes...</div>
        ) : orders.length > 0 ? (
          <div style={styles.orderContainer}>
            {orders.map((order, index) => (
              <div key={order._id} style={styles.orderItem}>
                <div style={styles.orderHeader}>
                  <span style={{ fontWeight: '600' }}>Commande #{index + 1}</span>
                  <span style={{ 
                    ...styles.orderStatus,
                    ...getStatusColor(order.status)
                  }}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                  <span style={{ color: '#7f8c8d' }}>Modèle: </span>
                  <span>{order.model || 'Non spécifié'}</span>
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                  <span style={{ color: '#7f8c8d' }}>nbr pices: </span>
                  <span>{order.prix ? `${order.prix} pices` : 'Non spécifié'}</span>
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                  <span style={{ color: '#7f8c8d' }}>Matricule: </span>
                  <span>{order.matricule || 'Non spécifié'}</span>
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                  <span style={{ color: '#7f8c8d' }}>Téléphone: </span>
                  <span>{order.tel || 'Non spécifié'}</span>
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                  <span style={{ color: '#7f8c8d' }}>Email: </span>
                  <span>{order.email || 'Non spécifié'}</span>
                </div>
                <div>
                  <span style={{ color: '#7f8c8d' }}>Date: </span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '1.5rem',
            textAlign: 'center',
            color: '#7f8c8d'
          }}>
            Aucune commande trouvée
          </div>
        )}
      </div>

      <div style={styles.buttonGroup}>
        {editing ? (
          <>
            <button 
              onClick={handleSave}
              style={{ ...styles.button, ...styles.successButton }}
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button 
              onClick={() => setEditing(false)}
              style={{ ...styles.button, ...styles.dangerButton }}
              disabled={loading}
            >
              Annuler
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEditClick}
              style={{ ...styles.button, ...styles.primaryButton }}
            >
              Modifier le profil
            </button>
            <button 
              onClick={handleLogout}
              style={{ ...styles.button, ...styles.secondaryButton }}
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profil;