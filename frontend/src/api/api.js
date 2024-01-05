// src/api/api.js
import axios from 'axios';
import md5 from 'md5';

// Base URL for Marvel API and keys
const BASE_URL = 'https://gateway.marvel.com/v1/public/';
const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY; 
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY; 

// Backend API URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Function to generate MD5 hash for Marvel API request
const getHash = (timestamp) => md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);

// Fetch characters from Marvel API based on a query
export const fetchCharacters = async (query) => {
  const timestamp = new Date().getTime(); // Current timestamp
  const hash = getHash(timestamp); // Hash for API authentication

  try {
    const response = await axios.get(`${BASE_URL}characters`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash,
        nameStartsWith: query,
        limit: 100, // Limit of characters to fetch
      },
    });

    return response.data.data.results; // Return fetched data
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

// Fetch comics for a specific character ID from Marvel API within a date range
export const fetchComics = async (characterId, startDate, endDate, totalComics) => {
  const timestamp = new Date().getTime();
  const hash = getHash(timestamp);

  try {
    const response = await axios.get(`${BASE_URL}characters/${characterId}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash,
        dateRange: `${startDate},${endDate}`, // Date range for filtering comics
        orderBy: 'onsaleDate', // Sort by onsale date
        limit: totalComics, // Total number of comics to fetch
      },
    });

    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching comics:', error);
    return [];
  }
};

// User registration using backend API
export const registerUser = async (username, password) => {
  try {
      // POST request to backend for registration
      const response = await axios.post(`${BACKEND_URL}/auth/register`, {
          username,
          password
      });
      return response;
  } catch (error) {
      console.error('Error registering user:', error);
      return error;
  }
};

// User login using backend API
export const loginUser = async (username, password) => {
  try {
      // POST request to backend for login
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
          username,
          password
      });
      localStorage.setItem('username', username); // Store username in local storage
      return response.data;
  } catch (error) {
      console.error('Error logging in:', error);
      return null;
  }
};

// Add a comic to the user's wishlist using backend API
export const addToWishlist = async (comic, token) => {
  try {
      // POST request to add comic to wishlist
      const response = await fetch(`${BACKEND_URL}/api/wishlist`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Use JWT token for authentication
          },
          body: JSON.stringify({ 
            comicId: comic.id, // Comic ID
            comicData: comic   // Full comic data
        })
      });
      if (!response.ok) {
          throw new Error('Error adding to wishlist');
      }
      return response.json();
  } catch (error) {
      console.error('Error adding to wishlist:', error);
  }
};

// Remove a comic from the user's wishlist using backend API
export const removeFromWishlist = async (comicId, token) => {
  try {
      // DELETE request to remove comic from wishlist
      const response = await fetch(`${BACKEND_URL}/api/wishlist`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Use JWT token for authentication
          },
          body: JSON.stringify({ comicId }) // Comic ID to remove
      });

      if (!response.ok) {
          throw new Error('Failed to remove from wishlist');
      }
      return response.json();
  } catch (error) {
      console.error('Error removing from wishlist:', error);
  }
};

// Fetch the user's wishlist from the backend API
export const fetchWishlist = async (token) => {
  try {
      const response = await fetch(`${BACKEND_URL}/api/wishlist`, {
          // GET request to fetch wishlist
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
      }
      return response.json();
  } catch (error) {
      console.error('Error fetching wishlist:', error);
      return null;
  }
};
