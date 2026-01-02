import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  
// Optional: Add token interceptors here for future authentication

export default API;
