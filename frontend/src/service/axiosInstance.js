import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://backend-32ot.onrender.com',
  withCredentials: true,

});
export default axiosInstance;