import axios from 'axios'

const apiurl = 'http://localhost:5000/produit'

export async function addProduit(buyData) {
    return await axios.post(`${apiurl}/addProduit`,buyData)
}
export async function getAllProduits() {
    return await axios.get(`${apiurl}/getAllProduits`)
  }
export async function deleteProduit(id) {
    return await axios.delete(`${apiurl}/delete/${id}`);  // Modification ici
}
export async function updateProduit(userData,idUser) {
    return await axios.put(`${apiurl}/updateProduit/${idUser}`,userData)
}