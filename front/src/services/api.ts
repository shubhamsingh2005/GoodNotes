// src/services/api.ts
import axios from 'axios';

// Use relative path '/api' so it works on:
// 1. Localhost (via Vite Proxy)
// 2. Vercel (via Rewrites)
const api = axios.create({
  baseURL: '/api', 
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
