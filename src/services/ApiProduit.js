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
// Ajoutez cette nouvelle fonction pour le filtrage par prix
export async function filterProduitsByPrice(minPrice, maxPrice) {
    return await axios.get(`${apiurl}/filter`, {
        params: { minPrice, maxPrice }
    });
}
export const getTopProducts = async () => {
    try {
        const response = await axios.get('/api/recommendations/top-products');
        return response.data;
    } catch (error) {
        console.error("Error fetching top products", error);
        return { top6: [], topByCategory: {} };
    }
};

export const getRecommendations = async (productId) => {
    try {
        const response = await axios.get(`/api/recommendations/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching recommendations", error);
        return [];
    }
};