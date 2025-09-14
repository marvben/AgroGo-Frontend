import API from '../api/axios';

export const fetchManyProducts = async (params) =>
  await API.get(`/api/products`, params);

export const fetchProduct = async (productId) =>
  await API.get(`/api/product/${productId}`);

export const createProduct = async (data, formData) =>
  await API.post(
    `/api/product/`,
    { data, formData },
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

export const updateProduct = async (productId) =>
  await API.put(`/api/product/${productId}`);

export const deleteProduct = async (productId) =>
  await API.delete(`/api/product/${productId}`);

export const deleteManyProducts = async (data) =>
  await API.delete(`/api/product`, data);

export const uploadProductImage = (userType, formData, method = 'post') =>
  API[method](`/api/${userType}s/profileImage`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
