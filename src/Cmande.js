import React, { useState, useEffect } from 'react';
import { addCommande } from "./services/ApiCommandes";
import { Link } from 'react-router-dom';

function Commande() {
  const [userEmail, setUserEmail] = useState("");
  const [newCommande, setNewCmd] = useState({
    model: "",
    prix: "",
    matricule: "",
    email: ""
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserEmail(userData.email);
      setNewCmd(prevState => ({
        ...prevState,
        email: userData.email,
        matricule: userData.username || "admin"
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
        matricule: newCommande.matricule, // Garde la même valeur pour matricule
        email: userEmail
      });
      alert("Commande ajoutée avec succès !");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'ajout de la commande");
    }
  };

  // Styles cohérents avec les autres formulaires
  const containerStyle = {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
  };

  const loginBoxStyle = {
    width: '350px',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4a67ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    marginBottom: '20px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#3a56e0',
  };

  const linkStyle = {
    display: 'block',
    color: '#4a67ff',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  const brandStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
  };

  return (
    <div style={containerStyle}>
      <div style={brandStyle}></div>
      <div style={loginBoxStyle}>
        <div style={titleStyle}>Nouvelle Commande</div>
        
        <input
          type="text"
          name="model"
          placeholder="Modèle du produit"
          style={inputStyle}
          value={newCommande.model}
          onChange={handleChange}
        />
        
        <input
          type="number"
          name="prix"
          placeholder="Prix"
          style={inputStyle}
          value={newCommande.prix}
          onChange={handleChange}
        />
        
        <input
          type="text"
          name="matricule"
          placeholder="Nom du client"
          style={inputStyle}
          value={newCommande.matricule}
          onChange={handleChange}
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={inputStyle}
          value={newCommande.email}
          onChange={handleChange}
          readOnly={!!userEmail}
        />
        
        <button
          onClick={AddNewCommande}
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Ajouter la commande
        </button>
        
        <Link to="/PayPage" style={linkStyle}>Procéder au paiement</Link>
      </div>
    </div>
  );
}

export default Commande;