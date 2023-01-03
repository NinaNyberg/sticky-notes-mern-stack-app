import api from './api';

export const loadNotes = () => api.get('/').then((response) => response.data);

export const noteSearch = (term) =>
  api.get(`/search?term=${term}`).then((response) => response.data);

export const editNote = (id, note) =>
  api.patch(`/${id}`, note).then((response) => response.data);

export const createNote = (note) =>
  api.post('/', note).then((response) => response.data);

export const deleteNote = (id) =>
  api.delete(`/${id}`).then((response) => response.data);
