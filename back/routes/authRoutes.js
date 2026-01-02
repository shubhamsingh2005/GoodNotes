const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/authController');
const auth = require('../middware/authMiddleware');
const User = require('../models/userModel');

const router = express.Router();

// Public Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

// Protected Routes
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/me', auth, updateUserProfile); // Update Profile

module.exports = router;
