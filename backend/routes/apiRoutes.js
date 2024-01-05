const express = require('express');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const pool = require('../db');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    // Extract token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    // If no token is provided, return 401 Unauthorized
    if (token == null) return res.sendStatus(401);

    // Verify the token; if invalid, return 403 Forbidden
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Set user data from token
        next(); // Proceed to the next middleware/route handler
    });
};

// Fetch user's wishlist
router.get('/wishlist', authenticateToken, async (req, res) => {
    try {
        const username = req.user.username; // Extract username from token
        // Query to select all wishlist items for the user
        const result = await pool.query('SELECT * FROM wishlist WHERE username = $1', [username]);
        res.json(result.rows); // Send wishlist items in response
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Add to user's wishlist
router.post('/wishlist', authenticateToken, async (req, res) => {
    try {
        const { comicId, comicData } = req.body; // Extract comicId and comicData from request body
        const username = req.user.username;

        // Check if the comic is already in the wishlist
        const checkResult = await pool.query(
            'SELECT * FROM wishlist WHERE username = $1 AND comic_id = $2',
            [username, comicId]
        );

        if (checkResult.rows.length > 0) {
            // Comic already exists in the wishlist
            return res.status(409).json({ message: 'This comic is already in your wishlist' });
        }

        // Insert new wishlist item
        const insertResult = await pool.query(
            'INSERT INTO wishlist (username, comic_id, comic_data) VALUES ($1, $2, $3) RETURNING *',
            [username, comicId, comicData]
        );

        res.status(201).json(insertResult.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Remove from user's wishlist
router.delete('/wishlist', authenticateToken, async (req, res) => {
    try {
        const { comicId } = req.body; // Extract comicId from request body
        const username = req.user.username;

        // Delete the wishlist item
        await pool.query(
            'DELETE FROM wishlist WHERE username = $1 AND comic_id = $2',
            [username, comicId]
        );

        res.status(200).json({ message: 'Comic removed from wishlist' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
