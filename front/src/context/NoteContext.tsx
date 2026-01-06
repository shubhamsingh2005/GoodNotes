import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAllNotes, 
  getTrashedNotes, 
  createNote, 
  deleteNote, 
  restoreNote, 
  deleteNotePermanently,
  updateNote, 
  pinNote, 
  starNote, 
  searchNotes,
  shareNote,
  fetchSharedNoteByCode
} from '../services/noteService';
import { getAllFolders, createFolder, deleteFolder, getFolderNotes } from '../services/folderService';

export interface Note {
  id: string;
  _id?: string;
  title: string;
  subtitle?: string;
  content: string;
  date: string;
  reminder: string | null;
  isPinned: boolean;
  isStarred: boolean;
  isTrashed: boolean;
  shareCode?: string;
  folder?: string;
  color?: string;
  isReminder?: boolean;
  reminderDate?: string;
  tags?: string[];
  user?: string;
  createdAt?: string;
}

interface Folder {
  id: string;
  _id?: string;
  name: string;
  createdAt: string;
  notes: any[];
}

interface NoteContextType {
  notes: Note[];
  folders: Folder[];
  trashedNotes: Note[];
  fetchNotes: () => void;
  fetchTrashedNotes: () => void;
  createNewNote: (noteData: any) => void;
  deleteNoteById: (id: string) => void; 
  restoreNoteById: (id: string) => void;
  permanentlyDeleteNoteById: (id: string) => void;
  updateNoteById: (id: string, noteData: any) => void;
  pinNoteById: (id: string, isPinned: boolean) => void;
  starNoteById: (id: string, isStarred: boolean) => void;
  searchNotesByQuery: (query: string) => void;
  fetchFolders: () => void;
  createNewFolder: (folderData: any) => void;
  deleteFolderById: (id: string) => void;
  getNotesByFolderId: (folderId: string) => Promise<any>;
  generateShareCode: (id: string) => Promise<any>;
  getSharedNote: (code: string) => Promise<any>;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    fetchNotes();
    fetchFolders();
    fetchTrashedNotes(); 
  }, []);

  const fetchNotes = async () => {
    const allNotes = await getAllNotes();
    setNotes(allNotes);
  };

  const fetchTrashedNotes = async () => {
    const trash = await getTrashedNotes();
    setTrashedNotes(trash);
  };

  const fetchFolders = async () => {
    const allFolders = await getAllFolders();
    setFolders(allFolders);
  };

  const createNewNote = async (noteData: any) => {
    const newNote = await createNote(noteData);
    setNotes([newNote, ...notes]);
  };

  const deleteNoteById = async (id: string) => {
    await deleteNote(id);
    const noteToTrash = notes.find(n => (n.id === id || n._id === id));
    if (noteToTrash) {
      setNotes(notes.filter((note) => (note.id !== id && note._id !== id)));
      setTrashedNotes([{ ...noteToTrash, isTrashed: true }, ...trashedNotes]);
    }
  };

  const restoreNoteById = async (id: string) => {
    await restoreNote(id);
    const noteToRestore = trashedNotes.find(n => (n.id === id || n._id === id));
    if (noteToRestore) {
        setTrashedNotes(trashedNotes.filter((note) => (note.id !== id && note._id !== id)));
        setNotes([{ ...noteToRestore, isTrashed: false }, ...notes]);
    }
  };

  const permanentlyDeleteNoteById = async (id: string) => {
    await deleteNotePermanently(id);
    setTrashedNotes(trashedNotes.filter((note) => (note.id !== id && note._id !== id)));
  };

  const updateNoteById = async (id: string, noteData: any) => {
    const updatedNote = await updateNote(id, noteData);
    setNotes(notes.map((note) => ((note.id === id || note._id === id) ? updatedNote : note)));
  };

  const pinNoteById = async (id: string, isPinned: boolean) => {
    const updatedNote = await pinNote(id, isPinned);
    setNotes(notes.map((note) => ((note.id === id || note._id === id) ? updatedNote : note)));
  };

  const starNoteById = async (id: string, isStarred: boolean) => {
    const updatedNote = await starNote(id, isStarred);
    setNotes(notes.map((note) => ((note.id === id || note._id === id) ? updatedNote : note)));
  };

  const searchNotesByQuery = async (query: string) => {
    const result = await searchNotes(query);
    setNotes(result);
  };

  const createNewFolder = async (folderData: any) => {
    const newFolder = await createFolder(folderData);
    setFolders([newFolder, ...folders]);
  };

  const deleteFolderById = async (id: string) => {
    await deleteFolder(id);
    setFolders(folders.filter((folder) => (folder.id !== id && folder._id !== id)));
  };

  const getNotesByFolderId = async (folderId: string) => {
    return await getFolderNotes(folderId);
  };

  // Share
  const generateShareCode = async (id: string) => {
      return await shareNote(id);
  };

  const getSharedNote = async (code: string) => {
      return await fetchSharedNoteByCode(code);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        folders,
        trashedNotes,
        fetchNotes,
        fetchTrashedNotes,
        createNewNote,
        deleteNoteById,
        restoreNoteById,
        permanentlyDeleteNoteById,
        updateNoteById,
        pinNoteById,
        starNoteById,
        searchNotesByQuery,
        fetchFolders,
        createNewFolder,
        deleteFolderById,
        getNotesByFolderId,
        generateShareCode,
        getSharedNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};
