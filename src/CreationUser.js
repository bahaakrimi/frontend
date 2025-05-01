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
  };
  const AddNewUser = async () => {
    try {
      await addUserClient(newUser);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div >
      <input placeholder='username' name='username' type='text' onChange={handleChange}></input>
      <input placeholder='email' name='email' type='email' onChange={handleChange}></input>
      <input placeholder='password' name='password' type='password' onChange={handleChange}></input>
      <input placeholder='age' name='age' type='number' onChange={handleChange}></input>
      <button
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