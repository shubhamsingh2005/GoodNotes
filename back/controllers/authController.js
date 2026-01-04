const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const mongoose = require('mongoose');

// Generate JWT
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in environment variables!");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body; // Added pic (optional)
  try {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ message: "Database is not connected. Check server logs." });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password, pic });
    if (user) {
      res.status(201).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, pic: user.pic },
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`);
    
    // 1. Check DB Connection
    if (mongoose.connection.readyState !== 1) {
        console.error("DB Not Connected! State:", mongoose.connection.readyState);
        return res.status(500).json({ message: "Server Error: Database not connected. Check .env MONGO_URI." });
    }

    // 2. Check Input
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    // 3. Find User
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 4. Check Password
    if (!user.password) {
        return res.status(500).json({ message: "Account corrupted (no password). Please contact support." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = generateToken(user._id);
      res.json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, pic: user.pic },
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error("Login Error Catch:", error);
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic; // Update Pic
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          pic: updatedUser.pic,
        },
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, updateUserProfile };
