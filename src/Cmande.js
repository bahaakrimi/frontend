import React, { useState, useEffect } from 'react';
import { addCommande } from "./services/ApiCommandes";
import { Link } from 'react-router-dom';

function Commande() {
  const [userEmail, setUserEmail] = useState("");
  const [newCommande, setNewCmd] = useState({
    model: "",
    prix: "",
    matricule: "", // Valeur par défaut pour nomclient
    email: ""
  });

  const styles = {
    containerStyle: {
      padding: '30px',
      maxWidth: '500px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    inputStyle: {
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    buttonStyle: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px',
      borderRadius: '6px',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
      transition: '0.3s ease',
      ':hover': {
        backgroundColor: '#0056b3',
      }
    },
    linkStyle: {
      textAlign: 'center',
      marginTop: '10px',
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserEmail(userData.email);
      setNewCmd(prevState => ({
        ...prevState,
        email: userData.email,
        matricule: userData.username || "admin" // Utilise le nom d'utilisateur ou "admin" par défaut
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCmd({ ...newCommande, [name]: value });
  };

  const AddNewCommande = async () => {
    try {
      if (!newCommande.model || !newCommande.prix || !newCommande.matricule) {
        alert("Veuillez remplir tous les champs obligatoires !");
        return;
      }
      
      await addCommande(newCommande);
      setNewCmd({
        model: "",
        prix: "",
        matricule: "admin", // Réinitialise avec la valeur par défaut
        email: userEmail
      });
      alert("Commande ajoutée avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de la commande");
    }
  };

  return (
    <div style={styles.containerStyle}>
      <input
        type="text"
        name="model"
        placeholder="nomproduit"
        style={styles.inputStyle}
        value={newCommande.model}
        onChange={handleChange}
      />
      <input
        type="number"
        name="prix"
        placeholder="nbrproduit"
        style={styles.inputStyle}
        value={newCommande.prix}
        onChange={handleChange}
      />
      <input
        type="text"
        name="matricule"
        placeholder="nomclient"
        style={styles.inputStyle}
        value={newCommande.matricule}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        style={styles.inputStyle}
        value={newCommande.email}
        onChange={handleChange}
        readOnly={!!userEmail}
      />
      <button
        onClick={AddNewCommande}
        style={styles.buttonStyle}
      >
        Ajouter une commande
      </button>
      <Link to="/PayPage" style={styles.linkStyle}>Acheter</Link>
    </div>
  );
}

export default Commande;