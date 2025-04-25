import React, { useState } from 'react';


import { addUserClient } from "./services/ApiUser";



function CreateUserForm () {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "", 
    role: "",

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
 

  };
  const AddNewUser = async () => {
    try {
      await addUserClient(newUser);
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
    <h1 >Creation User</h1>
    <label>username</label>
    <input style={inputStyle} type='text' name='username' placeholder='username' onChange={handleChange} ></input>
    <label>email</label>
    <input style={inputStyle} type='text' name='email' placeholder='email' onChange={handleChange}></input>
    <label>password</label>
    <input style={inputStyle} type='password' name='password' placeholder='password' onChange={handleChange}></input>
    <label>role</label>
    <input style={inputStyle} type='text' name='role' placeholder='role' onChange={handleChange}></input>
    <button style={linkStyle}
                  onClick={() => {
                    AddNewUser(newUser);
                  }}
                  className="bg-lightBlue-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  AddUser
                </button>
   </div>
  );
};

export default CreateUserForm;