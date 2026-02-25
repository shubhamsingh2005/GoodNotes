import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    notes: [],
    status: 'idle',
    error: null,
};
// Async fetch example
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const response = await fetch('/api/notes');
    const data = await response.json();
    return data;
});
const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.push({ ...action.payload, isTrashed: false }); // 🆕 default to not trashed
        },
        editNote: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = { ...action.payload };
            }
        },
        deleteNote: (state, action) => {
            // Permanently delete
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        pinNote: (state, action) => {
            const note = state.notes.find(note => note.id === action.payload);
            if (note) {
                note.isPinned = !note.isPinned;
            }
        },
        starNote: (state, action) => {
            const note = state.notes.find(note => note.id === action.payload);
            if (note) {
                note.isStarred = !note.isStarred;
            }
        },
        // 🆕 Trash-related actions
        moveToTrash: (state, action) => {
            const note = state.notes.find(note => note.id === action.payload);
            if (note) {
                note.isTrashed = true;
            }
        },
        restoreNote: (state, action) => {
            const note = state.notes.find(note => note.id === action.payload);
            if (note) {
                note.isTrashed = false;
            }
        },
        permanentlyDeleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchNotes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.notes = action.payload.map(note => ({
                ...note,
                isTrashed: note.isTrashed || false, // Ensure trash field is present
            }));
        })
            .addCase(fetchNotes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch notes';
        });
    },
});
export const { addNote, editNote, deleteNote, pinNote, starNote, moveToTrash, restoreNote, permanentlyDeleteNote } = noteSlice.actions;
export default noteSlice.reducer;
