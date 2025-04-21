import axios from 'axios'

const apiurl = 'http://localhost:5000/commandes'

export async function addCommande(userData) {
    return await axios.post(`${apiurl}/addCommande`,userData)
}