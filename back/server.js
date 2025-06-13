// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/noteRoutes')); // ✅ Notes route
app.use('/api/folders', require('./routes/folderRoutes')); // ✅ Folders route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

