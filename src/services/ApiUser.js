import axios from 'axios';

const apiurl = 'http://localhost:5000/users';

export async function addUserClient(userData) {
  return await axios.post(`${apiurl}/addUserClient`, userData);
}
export async function login(userData) {
  return await axios.post(`${apiurl}/login`,userData)
}
export async function getAllClient() {
  return await axios.get(`${apiurl}/getAllClient`)
}
export async function deleteUserById(id) {
  return await axios.delete(`${apiurl}/deleteUserById/${id}`)
}
export async function searchUserByUsername() {
  return await axios.get(`${apiurl}/searchUserByUsername`)
}