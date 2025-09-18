import API from '../api/axios';

export const uploadProfileImage = (data) =>
  API.post(`/api/users/profileImage`, data);

export const deleteProductImage = (productId, public_id) =>
  API.delete(`/api/products/${productId}/image`, { data: { public_id } });

export const deleteImageFromCloudinary = (public_id) =>
  API.delete(`/api/image`, { data: { public_id } });

export const deleteProfileImage = () => API.delete(`/api/users/profileImage`);
