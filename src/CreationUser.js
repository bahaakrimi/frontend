import React, { useState } from 'react';
import { addUserClient } from "./services/ApiUser";

function CreateUserForm() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "", 
    age: "" ,
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  }
  const AddNewUser = async () => {
    try {
      await addUserClient(newUser);

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div >
      <input placeholder='username' value={newUser.username} name='username' type='text' onChange={handleChange}></input>
      <input placeholder='email' value={newUser.email} name='email' type='email' onChange={handleChange}></input>
      <input placeholder='password' value={newUser.password} name='password' type='password' onChange={handleChange}></input>
      <input placeholder='age' value={newUser.age} name='age' type='number' onChange={handleChange}></input>
      <button
                  onClick={() => {AddNewUser(newUser)}}
                  
                >
                  AddUser
                </button>


      
    </div>
  );
};

export default CreateUserForm;