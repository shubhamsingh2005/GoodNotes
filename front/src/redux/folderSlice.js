// src/redux/folderSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const initialState = {
    folders: [
        { id: uuidv4(), name: 'Work', isTrashed: false },
        { id: uuidv4(), name: 'Personal', isTrashed: false }
    ],
    selectedFolder: null,
};
const folderSlice = createSlice({
    name: 'folder',
    initialState,
    reducers: {
        addFolder: (state, action) => {
            const exists = state.folders.some(folder => folder.name === action.payload && !folder.isTrashed);
            if (!exists) {
                state.folders.push({
                    id: uuidv4(),
                    name: action.payload,
                    isTrashed: false
                });
            }
        },
        setSelectedFolder: (state, action) => {
            state.selectedFolder = action.payload;
        },
        moveToTrash: (state, action) => {
            const folder = state.folders.find(folder => folder.id === action.payload);
            if (folder) {
                folder.isTrashed = true;
                if (state.selectedFolder === folder.id) {
                    state.selectedFolder = null;
                }
            }
        },
        restoreFolder: (state, action) => {
            const folder = state.folders.find(folder => folder.id === action.payload);
            if (folder) {
                folder.isTrashed = false;
            }
        },
        permanentlyDeleteFolder: (state, action) => {
            state.folders = state.folders.filter(folder => folder.id !== action.payload);
        },
    },
});
export const { addFolder, setSelectedFolder, moveToTrash, restoreFolder, permanentlyDeleteFolder, } = folderSlice.actions;
export default folderSlice.reducer;
