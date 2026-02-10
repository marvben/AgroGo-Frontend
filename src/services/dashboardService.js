import API from '../api/axios';

export const getBuyerStats = () => API.get('/api/dashboard/buyer-stats');
export const getFarmerStats = () => API.get('/api/dashboard/farmer-stats');
export const getAdminStats = () => API.get('/api/dashboard/admin-stats');
