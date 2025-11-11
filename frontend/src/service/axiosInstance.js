import axios from 'axios';
const axiosinstance = axios.create({
  baseURL: 'https://backend-32ot.onrender.com',
  withCredentials: true,

});
export default axiosinstance;