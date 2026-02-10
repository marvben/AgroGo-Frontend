import API from '../api/axios';

export const getAllOrdersAdmin = () => API.get('/api/orders/admin/all');
export const getFarmerOrders = () => API.get('/api/orders/farmer');
export const updateOrderStatus = (orderId, data) => API.patch(`/api/orders/admin/status/${orderId}`, data);
