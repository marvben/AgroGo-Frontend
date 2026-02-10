import API from '../api/axios';

// Category endpoints
export const getCategories = () => API.get('/api/categories');
export const createCategory = (data) => API.post('/api/categories', data);
export const updateCategory = (id, data) => API.patch(`/api/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/api/categories/${id}`);
