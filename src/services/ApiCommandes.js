import axios from 'axios'

const apiurl = 'http://localhost:5000/commande'

export async function addCommande(cmdData) {
    return await axios.post(`${apiurl}/addCommande`,cmdData)
}