// services/authService.js
import API from '../api/axios';

// Auth endpoints
export const registerUser = (data) => API.post(`/api/users/register`, data);

export const loginUser = (data) => API.post(`/api/users/login`, data);

export const logoutUser = () => API.post(`/api/users/logout`);

export const deleteUser = () => API.delete(`/api/users/delete`);

export const forgotPassword = (data) =>
  API.post(`/api/users/forgot-password`, data);

export const resetPassword = (params, data) =>
  API.patch(`/api/users/reset-password/${params}`, data);

export const checkUrlValidity = (params) =>
  API.get(`/api/users/reset-password/${params}`);

export const getProfile = () => API.get(`/api/users/profile`);
