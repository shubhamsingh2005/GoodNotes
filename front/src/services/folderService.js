// src/services/folderService.ts
import api from './api';
export const getAllFolders = async () => {
    const response = await api.get('/folders');
    return response.data;
};
export const createFolder = async (folderData) => {
    const response = await api.post('/folders', folderData);
    return response.data;
};
export const deleteFolder = async (id) => {
    const response = await api.delete(`/folders/${id}`);
    return response.data;
};
export const getFolderNotes = async (id) => {
    const response = await api.get(`/folders/${id}/notes`);
    return response.data;
};
