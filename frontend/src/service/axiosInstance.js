import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://site-e-commerce-ifpq.onrender.com/api/v0',
  withCredentials: true,

});
export default axiosInstance;