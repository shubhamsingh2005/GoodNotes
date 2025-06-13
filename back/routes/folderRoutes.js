const express = require('express');
const router = express.Router();
const {
  createFolder,
  getFolders,
  getFolderNotes,
  deleteFolder,
} = require('../controllers/folderController');  // Make sure this is correct

// Routes
router.post('/', createFolder); // Create folder
router.get('/', getFolders); // Get all folders
router.get('/:id/notes', getFolderNotes); // Get notes by folder
router.delete('/:id', deleteFolder); // Delete folder

module.exports = router;
