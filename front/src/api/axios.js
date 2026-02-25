import axios from 'axios';
// Use relative path - this works for both:
// 1. Local Development (via Vite Proxy in vite.config.ts)
// 2. Production (Vercel rewrites in vercel.json)
const API = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add a request interceptor to attach the token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export default API;
