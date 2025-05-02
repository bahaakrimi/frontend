


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PayPage.css'; 

import { createPaiement } from "./services/ApiPaiement";
import { Link } from 'react-router-dom';

const PayPage = () => {
  const [newpaiement, setNewpaiement] = useState({
    commande: "",
    user: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewpaiement({ ...newpaiement, [name]: value });
  };

  const AddNewPaiement = async () => {
    try {
      await createPaiement(newpaiement);
    } catch (error) {
      console.log(error);
    }
  };


  return (
   
    <>
    <div>
      <input placeholder='commande' name='commande' type='text' onChange={handleChange}></input>
      <input placeholder='user' name='user' type='text' onChange={handleChange}></input>
      <input placeholder='paymentMethod' name='paymentMethod' type='text' onChange={handleChange}></input>
    
      <button
                  onClick={() => {
                    AddNewPaiement(newpaiement);
                  }}
                  className="bg-lightBlue-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Add paiement
                </button>
      
      
      
      
      </div></>
  );
};

export default PayPage;