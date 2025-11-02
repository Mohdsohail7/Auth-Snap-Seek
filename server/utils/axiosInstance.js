const axios = require('axios');

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.UNSPLASH_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
});

module.exports = axiosInstance;
