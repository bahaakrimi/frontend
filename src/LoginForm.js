import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreationUser from './CreationUser'
import { login } from "./services/ApiUser";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [newAccount , setNewAccount] = useState({
    email :"",password:""
  })
  const handleChange = (e) => {
    const { name , value } = e.target;
    setNewAccount({...newAccount , [name]: value})
  }
  const login2 = async () => {
    try {

      const res = await login(newAccount);
      console.log("res" , res);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Sauvegarde les infos dans localStorage
      if(res.data.user.role === "client"){
        navigate('/App');
      }else{
        navigate('/GetProduit');
        
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
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
      <h2>Connexion</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          style={inputStyle}
          
        

          
        /><br></br>
        <br></br>
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          onChange={handleChange}
          style={inputStyle}
    
    
  
        /><br></br>
        <button
        style={buttonStyle}
        type="button"
        onClick={()=>{login2(newAccount)}}
        >
          Se connecter
        </button>
      </form>
      <Link to="/CreationUser" style={linkStyle}>CreationUser</Link>
      
    </div>
  );
};

export default LoginForm;
