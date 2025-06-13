const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
  },
  subtitle: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true, // Content is essential for the note
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder', // Reference to Folder model
    required: true, // Each note must belong to a folder
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  isReminder: {
    type: Boolean,
    default: false,
  },
  reminderDate: {
    type: Date,
    required: false, // Optional reminder date
    default: null,
  },
  colorPriority: {
    type: String,
    required: false,
    default: '', // Optional, but defaults to empty string
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true, // Each note must belong to a user
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
