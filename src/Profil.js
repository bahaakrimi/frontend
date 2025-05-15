import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Styles CSS en objets JavaScript
  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem 0'
    },
    container: {
      maxWidth: '42rem',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    header: {
      backgroundColor: '#2563eb',
      padding: '1.5rem',
      color: 'white'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    profileImage: {
      width: '5rem',
      height: '5rem',
      borderRadius: '50%',
      border: '2px solid white'
    },
    content: {
      padding: '1.5rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '1.5rem',
      marginBottom: '1.5rem'
    },
    card: {
      backgroundColor: '#f9fafb',
      padding: '1rem',
      borderRadius: '0.5rem'
    },
    title: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.75rem'
    },
    infoItem: {
      marginBottom: '0.5rem'
    },
    label: {
      fontWeight: '500'
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem'
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      color: 'white',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.2s'
    },
    editButton: {
      backgroundColor: '#f59e0b'
    },
    logoutButton: {
      backgroundColor: '#ef4444'
    },
    loading: {
      textAlign: 'center',
      marginTop: '2rem'
    },
    notFound: {
      textAlign: 'center',
      marginTop: '2rem'
    }
  };

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      } else {
        navigate('/login');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div style={styles.loading}>Chargement...</div>;
  }

  if (!userData) {
    return <div style={styles.notFound}>Utilisateur non trouvé</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* En-tête du profil */}
        <div style={styles.header}>
          <div style={styles.profileHeader}>
            <img 
              src={userData.user_image || 'default-profile.png'} 
              alt="Profile" 
              style={styles.profileImage}
            />
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{userData.username}</h1>
              <p style={{ color: '#bfdbfe' }}>{userData.email}</p>
              <p style={{ color: '#bfdbfe', textTransform: 'capitalize' }}>{userData.role}</p>
            </div>
          </div>
        </div>

        {/* Détails du profil */}
        <div style={styles.content}>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h2 style={styles.title}>Informations personnelles</h2>
              <div>
                <p style={styles.infoItem}>
                  <span style={styles.label}>Nom d'utilisateur:</span> {userData.username}
                </p>
                <p style={styles.infoItem}>
                  <span style={styles.label}>Email:</span> {userData.email}
                </p>
                <p style={styles.infoItem}>
                  <span style={styles.label}>Rôle:</span> {userData.role}
                </p>
                <p style={styles.infoItem}>
                  <span style={styles.label}>Âge:</span> {userData.age || 'Non spécifié'}
                </p>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.title}>Statistiques</h2>
              <div>
                <p style={styles.infoItem}>
                  <span style={styles.label}>Membre depuis:</span> {new Date(userData.createdAt).toLocaleDateString()}
                </p>
                <p style={styles.infoItem}>
                  <span style={styles.label}>Dernière mise à jour:</span> {new Date(userData.updatedAt).toLocaleDateString()}
                </p>
                <p style={styles.infoItem}>
                  <span style={styles.label}>Commandes passées:</span> {userData.commandes ? userData.commandes.length : 0}
                </p>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div style={styles.actions}>
            <button 
              onClick={() => navigate('/edit-profile')}
              style={{ ...styles.button, ...styles.editButton }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d97706'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f59e0b'}
            >
              Modifier le profil
            </button>
            <button 
              onClick={handleLogout}
              style={{ ...styles.button, ...styles.logoutButton }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;