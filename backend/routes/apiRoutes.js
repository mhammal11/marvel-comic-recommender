const express = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const pool = require('../db');

const router = express.Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// route: Fetch user's wishlist
router.get('/wishlist', authenticateToken, async (req, res) => {
    try {
        const username = req.user.username;
        const result = await pool.query('SELECT * FROM wishlist WHERE username = $1', [username]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// route: Add to user's wishlist
router.post('/wishlist', authenticateToken, async (req, res) => {
    try {
        const { comicId } = req.body;
        const username = req.user.username;
        
        // Check if comic already exists in the wishlist
        const checkResult = await pool.query(
            'SELECT * FROM wishlist WHERE username = $1 AND comic_id = $2',
            [username, comicId]
        );

        if (checkResult.rows.length > 0) {
            return res.status(409).json({ message: 'This comic is already in your wishlist' });
        }

        const insertResult = await pool.query(
            'INSERT INTO wishlist (username, comic_id) VALUES ($1, $2) RETURNING *',
            [username, comicId]
        );

        res.status(201).json(insertResult.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// route: Remove from user's wishlist
router.delete('/wishlist', authenticateToken, async (req, res) => {
    try {
        const { comicId } = req.body;
        const username = req.user.username;

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
