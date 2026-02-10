import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login if not already there)
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        // Optional: Clear any local storage auth data
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
