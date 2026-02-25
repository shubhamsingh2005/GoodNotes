import { jsx as _jsx } from "react/jsx-runtime";
// src/context/FolderContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getAllFolders, createFolder, deleteFolder, getFolderNotes } from '../services/folderService';
const FolderContext = createContext(undefined);
// Fix: Add explicit children prop type
export const FolderProvider = ({ children }) => {
    const [folders, setFolders] = useState([]);
    useEffect(() => {
        fetchFolders();
    }, []);
    const fetchFolders = async () => {
        const allFolders = await getAllFolders();
        setFolders(allFolders);
    };
    const createNewFolder = async (folderData) => {
        const newFolder = await createFolder(folderData);
        setFolders([...folders, newFolder]);
    };
    const deleteFolderById = async (id) => {
        await deleteFolder(id);
        setFolders(folders.filter((folder) => folder.id !== id));
    };
    const getNotesByFolderId = async (folderId) => {
        const notesInFolder = await getFolderNotes(folderId);
        return notesInFolder;
    };
    return (_jsx(FolderContext.Provider, { value: { folders, fetchFolders, createNewFolder, deleteFolderById, getNotesByFolderId }, children: children }));
};
export const useFolderContext = () => {
    const context = useContext(FolderContext);
    if (!context) {
        throw new Error('useFolderContext must be used within a FolderProvider');
    }
    return context;
};
