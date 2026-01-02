const express = require('express');
const router = express.Router();
const {
  createFolder,
  getFolders,
  getFolderNotes,
  deleteFolder,
} = require('../controllers/folderController');
const auth = require('../middware/authMiddleware');

// Apply auth middleware to all routes
router.use(auth);

// Routes
router.post('/', createFolder); 
router.get('/', getFolders); 
router.get('/:id/notes', getFolderNotes); 
router.delete('/:id', deleteFolder); 

module.exports = router;
