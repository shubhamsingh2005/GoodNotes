const Folder = require('../models/folderModel');
const Note = require('../models/noteModel');

// Create a new folder
const createFolder = async (req, res) => {
  const { name } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Folder name is required' });
  }

  try {
    const folder = await Folder.create({ 
      name, 
      user: req.user.id 
    });
    res.status(201).json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create folder' });
  }
};

// Get all folders for the user
const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch folders' });
  }
};

// Get notes within a specific folder (Ownership enforced)
const getFolderNotes = async (req, res) => {
  try {
    // First, verify the folder belongs to the user
    const folder = await Folder.findOne({ _id: req.params.id, user: req.user.id });
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found or unauthorized' });
    }

    // Then fetch notes in that folder
    const notes = await Note.find({ folder: req.params.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a folder (Ownership enforced)
const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found or unauthorized' });
    }

    // Optional: Delete all notes inside this folder?
    // await Note.deleteMany({ folder: req.params.id });

    res.json({ message: 'Folder deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFolder, getFolders, getFolderNotes, deleteFolder };
