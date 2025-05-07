import axios from 'axios'

const apiurl = 'http://localhost:5000/commande'

export async function addCommande(cmdData) {
    return await axios.post(`${apiurl}/addCommande`,cmdData)
}
export async function getAllCommande() {
    return await axios.get(`${apiurl}/getAllCommande`)
  }
 
  export async function updateCommande(userData,idUser) {
    return await axios.put(`${apiurl}/updateCommande/${idUser}`,userData)
}
export async function deleteCommandeById(id) {
    return await axios.delete(`${apiurl}/deleteCommandeById/${id}`)
  }