const Folder = require('../models/folderModel');
const Note = require('../models/noteModel');  // Assuming you have a Note model

const createFolder = async (req, res) => {
  const { name } = req.body;
  const userId = req.user?.id;

  if (!name) {
    return res.status(400).json({ message: 'Folder name is required' });
  }

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const folder = await Folder.create({ name, user: userId });
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user.id });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFolderNotes = async (req, res) => {
  try {
    const notes = await Note.find({ folder: req.params.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    await Folder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Folder deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFolder, getFolders, getFolderNotes, deleteFolder };
