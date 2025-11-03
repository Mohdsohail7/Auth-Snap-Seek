import apiAxios from "./apiConnector";


// API call to fetch user data
export async function fetchCurrentUser() {
  try {
    const response = await apiAxios.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Logout user
export const logoutUser = async () => {
  try {
    const response = await apiAxios.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error Logout user:', error);
    throw error;
  }
};

// login urls
export const loginUrls = {
  google: `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
  github: `${process.env.REACT_APP_BACKEND_URL}/auth/github`,
  facebook: `${process.env.REACT_APP_BACKEND_URL}/auth/facebook`,
};

// Fetch top searches
export const fetchTopSearches = async () => {
  try {
    const response = await apiAxios.get('/api/top-searches');
    return response.data;
  } catch (error) {
    console.error('Error fetching top searches:', error);
    throw error;
  }
};

// Search function
export const searchPhotos = async (term) => {
  if (!term.trim()) throw new Error('Search term cannot be empty');

  try {
    const response = await apiAxios.post('/api/search', { term });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error || error.message || 'Search failed';
    console.error('Search error:', message);
    throw new Error(message);
  }
};

// get history
export const fetchHistory = async () => {
  try {
    const response = await apiAxios.get('/api/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    return []; // fallback to empty array
  }
};