const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');

// Routes
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend origin for development server
    methods: 'GET,POST,PUT,DELETE',
    credentials: true // Enable credentials for CORS
}));

const pool = require('./db');

// Authentication and API routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Marvel Comics Recommender Backend is running!');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = { app, pool };
