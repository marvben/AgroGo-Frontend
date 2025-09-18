import API from '../api/axios';

export const fetchManyProducts = (params) => API.get(`/api/products`, params);

export const fetchProduct = (productId) => API.get(`/api/product/${productId}`);

export const createProduct = (formData) => API.post(`/api/products`, formData);

export const updateProduct = (productId, formData) =>
  API.patch(`/api/products/${productId}`, formData);

export const deleteProduct = (productId) =>
  API.delete(`/api/products/${productId}`);

export const deleteManyProducts = (data) => API.delete(`/api/products`, data);
