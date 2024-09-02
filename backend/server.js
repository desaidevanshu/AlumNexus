// server.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const blogRoutes=require('./routes/blogRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

const cors = require('cors');

// CORS configuration
app.use(cors());
app.use(express.json());

// Define your routes here




app.use('/auth', authRoutes);
app.use('/donations', authMiddleware, donationRoutes);
app.use('/events', eventRoutes);
app.use('/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
