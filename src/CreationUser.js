import React, { useState } from 'react';
import { addUserClient } from "./services/ApiUser";

function CreateUserForm() {
  
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

    } catch (error) {
      console.log(error);
    }
  };



  return (
<div>
    <input type='text' name='username' placeholder='username' onChange={handleChange} ></input>
    <input type='text' name='email' placeholder='email' onChange={handleChange}></input>
    <input type='password' name='password' placeholder='password' onChange={handleChange}></input>
    <input type='text' name='role' placeholder='role' onChange={handleChange}></input>
    <button
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