// src/api/api.js
import axios from 'axios';
import md5 from 'md5';

const BASE_URL = 'https://gateway.marvel.com/v1/public/';
const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY; 
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY; 

// Backend API Configuration
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const getHash = (timestamp) => md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);

export const fetchCharacters = async (query) => {
  const timestamp = new Date().getTime();
  const hash = getHash(timestamp);

  try {
    const response = await axios.get(`${BASE_URL}characters`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash,
        nameStartsWith: query,
        limit: 100, // Adjust the limit as needed
      },
    });

    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

export const fetchComics = async (characterId, startDate, endDate) => {
  const timestamp = new Date().getTime();
  const hash = getHash(timestamp);

  try {
    const response = await axios.get(`${BASE_URL}characters/${characterId}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: timestamp,
        hash,
        dateRange: `${startDate},${endDate}`, // Format: "yyyy-mm-dd,yyyy-mm-dd"
        orderBy: 'onsaleDate',
        limit: 10,
      },
    });

    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching comics:', error);
    return [];
  }
};

// User registration
export const registerUser = async (username, password) => {
  try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, {
          username,
          password
      });
      return response.data;
  } catch (error) {
      console.error('Error registering user:', error);
      return null;
  }
};

// User login
export const loginUser = async (username, password) => {
  try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
          username,
          password
      });
      localStorage.setItem('username', username); // Store the username
      return response.data;
  } catch (error) {
      console.error('Error logging in:', error);
      return null;
  }
};

export const addToWishlist = async (comicId, token) => {
  try {
      const response = await fetch(`${BACKEND_URL}/api/wishlist`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ comicId })
      });
      if (!response.ok) {
          throw new Error('Error adding to wishlist');
      }
      return response.json();
  } catch (error) {
      console.error('Error adding to wishlist:', error);
  }
};

export const removeFromWishlist = async (comicId, token) => {
  try {
      const response = await fetch(`${BACKEND_URL}/api/wishlist`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ comicId })
      });
      if (!response.ok) {
          throw new Error('Failed to remove from wishlist');
      }
      return response.json();
  } catch (error) {
      console.error('Error removing from wishlist:', error);
  }
};

export const fetchWishlist = async (token) => {
  try {
      const response = await fetch(`${BACKEND_URL}/api/wishlist`, {
          method: 'GET',
          headers: {
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
