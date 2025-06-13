const express = require('express');
const router = express.Router();
const { createNote, getNotes, deleteNote, updateNote, pinNote, setReminder } = require('../controllers/noteController');

// Define your routes with correct handler functions
router.post('/', createNote); // This should be a function like `createNote`
router.get('/', getNotes); // This should be a function like `getNotes`
router.delete('/:id', deleteNote); // This should be a function like `deleteNote`
router.put('/:id', updateNote); // This should be a function like `updateNote`
router.patch('/:id/pin', pinNote); // This should be a function like `pinNote`
router.patch('/:id/reminder', setReminder); // This should be a function like `setReminder`

module.exports = router;
