import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/',
  withCredentials: true, // Send cookies with requests
});

export default api;
// Interceptors can be added here for request/response handling
