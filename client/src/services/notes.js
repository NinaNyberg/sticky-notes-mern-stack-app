import api from './api';

export const loadNotes = () =>
  api.get('/notes').then((response) => response.data);

// export const getMode = () =>
//   api.get('/notes').then((response) => response.data);

export const noteSearch = (term) =>
  api.get(`/notes/search?term=${term}`).then((response) => response.data);

// export const editTask = (id, task) =>
//   api.patch(`/${id}`, task).then((response) => response.data);

export const createNote = (note) =>
  api.post('/notes', note).then((response) => response.data);

export const deleteNote = (id) =>
  api.delete(`/notes/${id}`).then((response) => response.data);
