


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PayPage.css'; 

import { addpaiement } from "./services/ApiPaiement";
import { Link } from 'react-router-dom';

const PayPage = () => {
  const [newpaiement, setNewpaiement] = useState({
    order: "",
    payementmethod: "",
    statut: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewpaiement({ ...newpaiement, [name]: value });
  };

  const AddNewPaiement = async () => {
    try {
      await addpaiement(newpaiement);
    } catch (error) {
      console.log(error);
    }
  };


  return (
   
    <>
    <div>
      <input placeholder='order' name='order' type='text' onChange={handleChange}></input>
      <input placeholder='payementmethod' name='payementmethod' type='text' onChange={handleChange}></input>
      <input placeholder='statut' name='statut' type='text' onChange={handleChange}></input>
    
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