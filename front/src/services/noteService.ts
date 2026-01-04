import api from './api';

// Fetch all active notes
export const getAllNotes = async () => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Fetch trashed notes
export const getTrashedNotes = async () => {
  try {
    const response = await api.get('/notes?trash=true');
    return response.data;
  } catch (error) {
    console.error('Error fetching trashed notes:', error);
    throw error;
  }
};

// Create a new note
export const createNote = async (noteData: any) => {
  try {
    const response = await api.post('/notes', noteData);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Delete a note by ID (Soft Delete)
export const deleteNote = async (id: string) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

// Restore a note
export const restoreNote = async (id: string) => {
  try {
    const response = await api.patch(`/notes/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error('Error restoring note:', error);
    throw error;
  }
};

// Permanently Delete a note
export const deleteNotePermanently = async (id: string) => {
  try {
    const response = await api.delete(`/notes/${id}/permanent`);
    return response.data;
  } catch (error) {
    console.error('Error permanently deleting note:', error);
    throw error;
  }
};

// Update a note by ID
export const updateNote = async (id: string, noteData: any) => {
  try {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Pin a note by ID
export const pinNote = async (id: string, isPinned: boolean) => {
  try {
    const response = await api.patch(`/notes/${id}/pin`);
    return response.data;
  } catch (error) {
    console.error('Error pinning note:', error);
    throw error;
  }
};

// Star a note by ID
export const starNote = async (id: string, isStarred: boolean) => {
  try {
    const response = await api.patch(`/notes/${id}/star`);
    return response.data;
  } catch (error) {
    console.error('Error starring note:', error);
    throw error;
  }
};

// Search notes based on query
export const searchNotes = async (query: string) => {
  try {
    const response = await api.get(`/notes?search=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching notes:', error);
    throw error;
  }
};

// Generate Share Code
export const shareNote = async (id: string) => {
    try {
        const response = await api.post(`/notes/${id}/share`);
        return response.data; // { shareCode: "1234" }
    } catch (error) {
        console.error('Error sharing note:', error);
        throw error;
    }
};

// Fetch Shared Note by Code
export const fetchSharedNoteByCode = async (code: string) => {
    try {
        const response = await api.get(`/notes/shared/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching shared note:', error);
        throw error;
    }
};

// Export all as `noteService`
export const noteService = {
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
  fetchSharedNoteByCode,
};
