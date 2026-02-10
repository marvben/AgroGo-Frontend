import API from '../api/axios';

// Tag endpoints
export const getTags = () => API.get('/api/tags');
export const createTag = (data) => API.post('/api/tags', data);
export const updateTag = (id, data) => API.patch(`/api/tags/${id}`, data);
export const deleteTag = (id) => API.delete(`/api/tags/${id}`);
