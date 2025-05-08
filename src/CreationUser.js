import React, { useState } from 'react';
import { addUserClient } from "./services/ApiUser";
import { useNavigate } from 'react-router-dom';

function CreateUserForm() {
  
  const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
      username: "",
      email: "",
      password: "", 
      role: "",
  
    });
  

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    console.log(newUser)
  }
  const AddNewUser = async () => {
    try {
      await addUserClient(newUser);
      navigate('/App');

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
  <h1>création un compte </h1>
    <input style={inputStyle} type='text' name='username' placeholder='username' onChange={handleChange} ></input>
    <input style={inputStyle} type='text' name='email' placeholder='email' onChange={handleChange}></input>
    <input style={inputStyle} type='password' name='password' placeholder='password' onChange={handleChange}></input>
    <input style={inputStyle} type='text' name='role' placeholder='role' onChange={handleChange}></input>
    <button
    style={buttonStyle}
                  onClick={() => {
                    AddNewUser(newUser);
                  }}
                  
                >
                  AddUser
                </button>
   </div>
  );
};

export default CreateUserForm;