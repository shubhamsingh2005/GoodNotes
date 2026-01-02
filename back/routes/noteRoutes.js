const express = require('express');
const router = express.Router();
const { 
  createNote, 
  getNotes, 
  deleteNote, 
  updateNote, 
  pinNote, 
  starNote, 
  setReminder,
  restoreNote,
  deleteNotePermanently
} = require('../controllers/noteController');
const auth = require('../middware/authMiddleware');

router.use(auth);

// CRUD
router.post('/', createNote);
router.get('/', getNotes); // Handles ?trash=true
router.delete('/:id', deleteNote); // Soft delete
router.put('/:id', updateNote);

// Actions
router.patch('/:id/pin', pinNote);
router.patch('/:id/star', starNote);
router.patch('/:id/reminder', setReminder);
router.patch('/:id/restore', restoreNote); // Restore from trash
router.delete('/:id/permanent', deleteNotePermanently); // Hard delete

module.exports = router;
