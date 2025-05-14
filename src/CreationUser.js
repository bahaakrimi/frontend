import React, { useState } from 'react';
import { addUserClient } from "./services/ApiUser";
import { useNavigate } from 'react-router-dom';

function CreateUserForm() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "", 
    role: "client",
    age: 0 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    console.log(newUser);
  };

  const AddNewUser = async () => {
    try {
      await addUserClient(newUser);
      navigate('/App');
    } catch (error) {
      console.log(error);
    }
  };

  // Styles CSS pour correspondre au formulaire de login
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
        <div style={titleStyle}>Create New Account</div>
        
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          style={inputStyle}
        />
        
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
          style={inputStyle}
        />
        
        <input
          type="hidden"
          name="role"
          value="client"
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          style={inputStyle}
          placeholder="telephone"
        
          onChange={handleChange}
        />
        
        <button
          style={signInButtonStyle}
          onClick={AddNewUser}
          onMouseEnter={(e) => e.target.style.backgroundColor = signInButtonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = signInButtonStyle.backgroundColor}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default CreateUserForm;