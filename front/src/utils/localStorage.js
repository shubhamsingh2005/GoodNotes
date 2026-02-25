const NOTES_KEY = 'goodnotes-app-notes';
export const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};
export const getNotesFromLocalStorage = () => {
    const notes = localStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
};
