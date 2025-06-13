const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');

// Register (Signup)
exports.registerUser = [
  // Validate input
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error during registration', error });
    }
  }
];

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
};
