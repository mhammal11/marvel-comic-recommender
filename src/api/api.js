// src/api/api.js
import axios from 'axios';
import md5 from 'md5';

const BASE_URL = 'https://gateway.marvel.com/v1/public/';
const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY; // Set your public key in .env file
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY; // Set your private key in .env file

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
