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
        navigate('/Userlist');
        
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };



  return (
    <div>
      <h2>Connexion</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          
        

          
        /><br></br>
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          onChange={handleChange}
    
    
  
        />
        <button
        type="button"
        onClick={()=>{login2(newAccount)}}
        >
          Se connecter
        </button>
      </form>
      <Link to="/CreationUser">CreationUser</Link>
      
    </div>
  );
};

export default LoginForm;
