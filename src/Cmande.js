import React, { useState } from 'react';
import { addCommande } from "./services/ApiCommandes";
import  PayPage from "./PayPage"
import { Link } from 'react-router-dom';

function Cmande() {

    const [newCommande, setNewCmd] = useState({

        user: "",
        totalpric: "",
        statut: "", 

    
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCmd({ ...newCommande, [name]: value });
     
    
    };
    const AddNewCommande = async () => {
        try {
          await addCommande(newCommande);
        } catch (error) {
          console.log(error);
        } 
      };

    return(
        <div>
          

            <input type="text" name='user' placeholder="nom du client"></input>
            <input type="number" name='totalpric' placeholder="totalpric"></input>
            <input type="text" name='statut' placeholder="statut"></input>
            <button
                  onClick={() => {
                    AddNewCommande(newCommande);
                  }}
                  className="bg-lightBlue-500 mt-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Add
                </button>
            <Link to="/PayPage">buy</Link>
        </div>
    )
}
export default Cmande;