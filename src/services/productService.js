import API from '../api/axios';

export const fetchManyProducts = ({
  property,
  newOrder,
  id,
  limit,
  cursor,
}) => {
  //URLSearchParams is a built-in JavaScript object that makes it easy to create and manage query strings.
  // queryParams.toString() converts the object into a URL-encoded query string.
  //// Output: "sortBy=price&order=asc&limit=10"
  const queryParams = new URLSearchParams({
    orderBy: property,
    order: newOrder,
    id: id || '',
    limit: limit?.toString() || '10',
    cursor: cursor || '',
  });
  return API.get(`/api/products?${queryParams.toString()}`);
};

export const fetchProduct = (productId) => API.get(`/api/product/${productId}`);

export const createProduct = (formData) => API.post(`/api/products`, formData);

export const updateProduct = (productId, formData) =>
  API.patch(`/api/products/${productId}`, formData);

export const deleteProduct = ({ userId, productId }) =>
  API.delete(`/api/products/${productId}`, { data: { userId } });

export const deleteManyProducts = (data) => API.delete(`/api/products`, data);
