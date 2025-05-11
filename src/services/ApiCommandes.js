import axios from 'axios'

const apiurl = 'http://localhost:5000/commande'

export async function addCommande(cmdData) {
    return await axios.post(`${apiurl}/addCommande`,cmdData)
}
export async function getAllCommande() {
    return await axios.get(`${apiurl}/getAllCommande`)
  }
 
 // Dans ApiCommande.js (frontend)
export async function updateCommande(id, userData) {  // Notez le paramètre 'id' séparé
  return await axios.put(`${apiurl}/updateCommande/${id}`, userData)
}
export async function deleteCommandeById(id) {
    return await axios.delete(`${apiurl}/deleteCommandeById/${id}`)
  }
  
  export async function affectCommande(data) {
  return await axios.put(`${apiurl}/affect`, data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
}