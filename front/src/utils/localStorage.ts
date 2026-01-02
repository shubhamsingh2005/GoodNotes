// src/utils/localStorageUtils.ts
  import { Note } from '../types/Note';

const NOTES_KEY = 'goodnotes-app-notes';

export const saveNotesToLocalStorage = (notes: Note[]) => {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

export const getNotesFromLocalStorage = (): Note[] => {
  const notes = localStorage.getItem(NOTES_KEY);
  return notes ? JSON.parse(notes) : [];
};
