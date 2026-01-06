const Note = require('../models/noteModel');

// Create a new note
const createNote = async (req, res) => {
  const { title, subtitle, content, folder, tags, isPinned, isStarred, isReminder, reminderDate, colorPriority, color } = req.body;

  try {
    const note = await Note.create({
      title,
      subtitle,
      content,
      folder: folder || null, 
      tags: tags || [], 
      isPinned,
      isStarred,
      isReminder,
      reminderDate, 
      colorPriority,
      color, // Added color
      user: req.user.id, 
    });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// Get all notes 
const getNotes = async (req, res) => {
  try {
    const { search, trash } = req.query;
    let query = { user: req.user.id };

    if (trash === 'true') {
        query.isTrashed = true;
    } else {
        query.isTrashed = false; 
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } } 
      ];
    }

    const notes = await Note.find(query).sort({ isPinned: -1, createdAt: -1 }); 
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// Delete Note (Soft)
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
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

// Update Note
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

// Pin Note
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

// Star Note
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

// Set Reminder
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

// --- Sharing Logic ---

// Generate Share Code
const shareNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });

        // Generate 4-digit code (simple)
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        
        note.shareCode = code;
        await note.save();
        
        res.json({ shareCode: code });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch Shared Note by Code
const getSharedNote = async (req, res) => {
    try {
        const { code } = req.params;
        if (!code) return res.status(400).json({ message: 'Code required' });

        // Find note by code (Ignore User Check!)
        const note = await Note.findOne({ shareCode: code });
        
        if (!note) return res.status(404).json({ message: 'Invalid code or note not found' });

        // Only return necessary fields? Or all?
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNote, getNotes, deleteNote, updateNote, pinNote, starNote, setReminder, restoreNote, deleteNotePermanently, shareNote, getSharedNote };
