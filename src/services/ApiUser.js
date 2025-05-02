import axios from 'axios';

const apiurl = 'http://localhost:5000/users';

export async function addUserClient(userData) {
  return await axios.post(`${apiurl}/addUserClient`, userData);
}
