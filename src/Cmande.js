import React, { useState } from 'react';
import { addCommande } from "./services/ApiCommandes";
import { Link } from 'react-router-dom';

function Cmande() {
  const [newCommande, setNewCmd] = useState({
    user: "",
    totalpric: "",
    statut: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCmd({ ...newCommande, [name]: value });
  };

  const AddNewCommande = async () => {
    try {
      await addCommande(newCommande);
    } catch (error) {
      console.log(error);
    }
  };

  // 🎨 Styles CSS
  const containerStyle = {
    padding: '30px',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s ease',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#0056b3',
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '10px',
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        name="user"
        placeholder="Nom du client"
        style={inputStyle}

        onChange={handleChange}
      />
      <input
        type="number"
        name="totalpric"
        placeholder="Total price"
        style={inputStyle}

        onChange={handleChange}
      />
      <input
        type="text"
        name="statut"
        placeholder="Statut"
        style={inputStyle}
      
        onChange={handleChange}
      />
      <button
        onClick={() => {
          AddNewCommande(newCommande);
        }}
        style={buttonStyle}
    
      >
        Add newCommande
      </button>
      <Link to="/PayPage" style={linkStyle}>Buy</Link>
    </div>
  );
}

export default Cmande;
