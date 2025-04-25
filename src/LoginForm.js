import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreationUser from './CreationUser'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Connexion en cours...");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Connexion réussie !");
        console.log("Utilisateur connecté :", data.user);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("Une erreur s'est produite.");
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
    <div style={containerStyle} >
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          style={inputStyle}
          onChange={(e) => setEmail(e.target.value)}
          required
          
        /><br></br>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={{ width: "40%" }}>
          Se connecter
        </button>
      </form>
      <Link to="/CreationUser"style={linkStyle}>CreationUser</Link>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;
