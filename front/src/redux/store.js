// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Your existing auth reducer
import folderReducer from './folderSlice'; // Import the new folder slice
import noteReducer from './noteSlice'; // Import the new note slice
export const store = configureStore({
    reducer: {
        auth: authReducer, // Keep your auth reducer
        folder: folderReducer, // Add the folder reducer
        note: noteReducer, // Add the note reducer
    },
});
export default store;
