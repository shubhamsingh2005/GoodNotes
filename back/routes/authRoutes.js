// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/login', (req, res) => {
    console.log('Login route hit!');
    res.json({ message: 'Route is working' });
  });
  
module.exports = router;
