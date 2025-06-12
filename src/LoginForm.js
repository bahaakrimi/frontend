import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreationUser from './CreationUser';
import { login } from "./services/ApiUser";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [newAccount, setNewAccount] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({...newAccount, [name]: value});
    // Clear error when user starts typing
    if (error) setError("");
  };

  const login2 = async () => {
    // Basic validation
    if (!newAccount.email || !newAccount.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const res = await login(newAccount);
      console.log("res", res);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if(res.data.user.role === "client") {
    navigate('/App');
  } else if(res.data.user.role === "responsable") {
    navigate('/Getcomandlist');
  } else {
    
    navigate('/GetProduit'); 
  }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  // Styles CSS pour correspondre à l'image
  const containerStyle = {
    backgroundColor: '#FFD700',
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

  const passwordInputStyle = {
    ...inputStyle,
    marginBottom: '10px',
  };

  const signInButtonStyle = {
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

  const signInButtonHoverStyle = {
    backgroundColor: '#3a56e0',
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    color: '#999',
  };

  const lineStyle = {
    flex: '1',
    height: '1px',
    backgroundColor: '#ddd',
  };

  const orTextStyle = {
    padding: '0 10px',
  };

  const registerLinkStyle = {
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

  const errorStyle = {
    color: '#d9534f',
    marginBottom: '15px',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <div style={brandStyle}></div>
      <div style={loginBoxStyle}>
        <div style={titleStyle}>Login</div>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          style={inputStyle}
        />
        
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          style={passwordInputStyle}
        />
        
        <button
          style={signInButtonStyle}
          type="button"
          onClick={login2}
          onMouseEnter={(e) => e.target.style.backgroundColor = signInButtonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = signInButtonStyle.backgroundColor}
        >
          Sign In
        </button>
        
        <div style={dividerStyle}>
          <div style={lineStyle}></div>
          <div style={orTextStyle}>OR</div>
          <div style={lineStyle}></div>
        </div>
        
        <Link to="/CreationUser" style={registerLinkStyle}>Register To Create Account</Link>
      </div>
    </div>
  );
};

export default LoginForm;