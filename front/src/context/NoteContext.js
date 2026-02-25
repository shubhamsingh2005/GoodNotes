import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { getAllNotes, getTrashedNotes, createNote, deleteNote, restoreNote, deleteNotePermanently, updateNote, pinNote, starNote, searchNotes, shareNote, fetchSharedNoteByCode } from '../services/noteService';
import { getAllFolders, createFolder, deleteFolder, getFolderNotes } from '../services/folderService';
const NoteContext = createContext(undefined);
export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [trashedNotes, setTrashedNotes] = useState([]);
    const [folders, setFolders] = useState([]);
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
    const createNewNote = async (noteData) => {
        const newNote = await createNote(noteData);
        setNotes([newNote, ...notes]);
    };
    const deleteNoteById = async (id) => {
        await deleteNote(id);
        const noteToTrash = notes.find(n => (n.id === id || n._id === id));
        if (noteToTrash) {
            setNotes(notes.filter((note) => (note.id !== id && note._id !== id)));
            setTrashedNotes([{ ...noteToTrash, isTrashed: true }, ...trashedNotes]);
        }
    };
    const restoreNoteById = async (id) => {
        await restoreNote(id);
        const noteToRestore = trashedNotes.find(n => (n.id === id || n._id === id));
        if (noteToRestore) {
            setTrashedNotes(trashedNotes.filter((note) => (note.id !== id && note._id !== id)));
            setNotes([{ ...noteToRestore, isTrashed: false }, ...notes]);
        }
    };
    const permanentlyDeleteNoteById = async (id) => {
        await deleteNotePermanently(id);
        setTrashedNotes(trashedNotes.filter((note) => (note.id !== id && note._id !== id)));
    };
    const updateNoteById = async (id, noteData) => {
        const updatedNote = await updateNote(id, noteData);
        setNotes(notes.map((note) => ((note.id === id || note._id === id) ? updatedNote : note)));
    };
    const pinNoteById = async (id, isPinned) => {
        const updatedNote = await pinNote(id, isPinned);
        setNotes(notes.map((note) => ((note.id === id || note._id === id) ? updatedNote : note)));
    };
    const starNoteById = async (id, isStarred) => {
        const updatedNote = await starNote(id, isStarred);
        setNotes(notes.map((note) => ((note.id === id || note._id === id) ? updatedNote : note)));
    };
    const searchNotesByQuery = async (query) => {
        const result = await searchNotes(query);
        setNotes(result);
    };
    const createNewFolder = async (folderData) => {
        const newFolder = await createFolder(folderData);
        setFolders([newFolder, ...folders]);
    };
    const deleteFolderById = async (id) => {
        await deleteFolder(id);
        setFolders(folders.filter((folder) => (folder.id !== id && folder._id !== id)));
    };
    const getNotesByFolderId = async (folderId) => {
        return await getFolderNotes(folderId);
    };
    // Share
    const generateShareCode = async (id) => {
        return await shareNote(id);
    };
    const getSharedNote = async (code) => {
        return await fetchSharedNoteByCode(code);
    };
    return (_jsx(NoteContext.Provider, { value: {
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
        }, children: children }));
};
export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
};
