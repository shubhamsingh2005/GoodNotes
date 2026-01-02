// src/context/FolderContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllFolders, createFolder, deleteFolder, getFolderNotes } from '../services/folderService';

interface Folder {
  id: string;
  name: string;
  createdAt: string;
  notes: any[]; // Add your note structure here
}

interface FolderContextType {
  folders: Folder[];
  fetchFolders: () => void;
  createNewFolder: (folderData: any) => void;
  deleteFolderById: (id: string) => void;
  getNotesByFolderId: (folderId: string) => void;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC = ({ children }) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const allFolders = await getAllFolders();
    setFolders(allFolders);
  };

  const createNewFolder = async (folderData: any) => {
    const newFolder = await createFolder(folderData);
    setFolders([...folders, newFolder]);
  };

  const deleteFolderById = async (id: string) => {
    await deleteFolder(id);
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  const getNotesByFolderId = async (folderId: string) => {
    const notesInFolder = await getFolderNotes(folderId);
    return notesInFolder;
  };

  return (
    <FolderContext.Provider value={{ folders, fetchFolders, createNewFolder, deleteFolderById, getNotesByFolderId }}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error('useFolderContext must be used within a FolderProvider');
  }
  return context;
};
