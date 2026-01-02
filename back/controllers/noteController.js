const Note = require('../models/noteModel');

// Create a new note
const createNote = async (req, res) => {
  const { title, subtitle, content, folder, isPinned, isStarred, isReminder, colorPriority } = req.body;

  try {
    const note = await Note.create({
      title,
      subtitle,
      content,
      folder: folder || null, 
      isPinned,
      isStarred,
      isReminder,
      colorPriority,
      user: req.user.id, 
    });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// Get all notes (Active only, unless ?trash=true)
const getNotes = async (req, res) => {
  try {
    const { search, trash } = req.query;
    let query = { user: req.user.id };

    // If trash=true, show only trashed notes. Else show only active notes.
    if (trash === 'true') {
        query.isTrashed = true;
    } else {
        query.isTrashed = false; // Default: Hide trash
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const notes = await Note.find(query).sort({ isPinned: -1, createdAt: -1 }); 
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// Soft Delete a note (Move to Trash)
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    note.isTrashed = true;
    await note.save();

    res.json({ message: 'Note moved to trash' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Restore Note
const restoreNote = async (req, res) => {
    try {
      const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
      if (!note) return res.status(404).json({ message: 'Note not found' });
      
      note.isTrashed = false;
      await note.save();
      res.json({ message: 'Note restored' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Permanently Delete
const deleteNotePermanently = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note permanently deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pin a note
const pinNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    note.isPinned = !note.isPinned; 
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Star a note
const starNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    note.isStarred = !note.isStarred; 
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set a reminder
const setReminder = async (req, res) => {
  const { reminderDate } = req.body; 
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    note.isReminder = true;
    note.reminderDate = reminderDate;
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNote, getNotes, deleteNote, updateNote, pinNote, starNote, setReminder, restoreNote, deleteNotePermanently };
