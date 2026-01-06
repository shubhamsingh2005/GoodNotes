const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  subtitle: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true, 
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder', 
    required: false, 
  },
  tags: [{ 
    type: String
  }],
  isPinned: {
    type: Boolean,
    default: false,
  },
  isStarred: { 
    type: Boolean,
    default: false,
  },
  isTrashed: {
    type: Boolean,
    default: false,
  },
  isReminder: {
    type: Boolean,
    default: false,
  },
  reminderDate: {
    type: Date,
    required: false,
    default: null,
  },
  shareCode: { 
    type: String, 
    default: null,
  },
  color: { // New Color Field
    type: String,
    default: 'default', // 'default', 'red', 'blue', etc.
  },
  colorPriority: {
    type: String,
    required: false,
    default: '', 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true, 
  },
}, {
  timestamps: true, 
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
