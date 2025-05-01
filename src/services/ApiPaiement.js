import axios from 'axios'

const apiurl = 'http://localhost:5000/paiement'

export async function addpaiement(buyData) {
    return await axios.post(`${apiurl}/addpaiement`,buyData)
}