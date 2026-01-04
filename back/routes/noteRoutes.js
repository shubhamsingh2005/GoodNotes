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
  deleteNotePermanently,
  shareNote,
  getSharedNote
} = require('../controllers/noteController');
const auth = require('../middware/authMiddleware');

router.use(auth);

// Sharing (Must be before generic :id routes if any exist, though currently none conflict)
router.get('/shared/:code', getSharedNote); 
router.post('/:id/share', shareNote);

// CRUD
router.post('/', createNote);
router.get('/', getNotes); 
router.delete('/:id', deleteNote); 
router.put('/:id', updateNote);

// Actions
router.patch('/:id/pin', pinNote);
router.patch('/:id/star', starNote);
router.patch('/:id/reminder', setReminder);
router.patch('/:id/restore', restoreNote); 
router.delete('/:id/permanent', deleteNotePermanently); 

module.exports = router;
