import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecommerce-api-xitw.onrender.com'
});

export default api;
