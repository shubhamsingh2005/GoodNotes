const Note = require('../models/noteModel');

// Create a new note
const createNote = async (req, res) => {
  const { title, subtitle, content, folder, isPinned, isReminder, colorPriority } = req.body;

  if (!folder || folder.trim() === '') {
    return res.status(400).json({ message: 'Folder ID is required' });
  }

  try {
    const note = await Note.create({
      title,
      subtitle,
      content,
      folder,
      isPinned,
      isReminder,
      colorPriority,
      user: req.user.id,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const { title, subtitle, content, folder, isPinned, isReminder, colorPriority } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, content, folder, isPinned, isReminder, colorPriority },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pin a note (toggle pin status)
const pinNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    note.isPinned = !note.isPinned; // Toggle the pin status
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set a reminder for a note
const setReminder = async (req, res) => {
  const { reminderDate } = req.body; // assuming you're passing a reminder date

  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    note.isReminder = true; // Set the reminder flag
    note.reminderDate = reminderDate; // Set the reminder date
    await note.save();
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createNote, getNotes, deleteNote, updateNote, pinNote, setReminder };
