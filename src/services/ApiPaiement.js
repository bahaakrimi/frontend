import axios from 'axios'

const apiurl = 'http://localhost:5000/paiement'

export async function createPaiement(buyData) {
    return await axios.post(`${apiurl}/createPaiement`,buyData)
}