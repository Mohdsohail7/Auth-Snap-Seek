import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { searchPhotos } from '../api/apis';

export default function SearchBar({ onResults, setSearching }) {
  const [term, setTerm] = useState('');
  const { user } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!term.trim()) return;

    setSearching(true); 
    try {
      const data = await searchPhotos(term);
      onResults(data);
    } catch (err) {
      alert(err.message);
      setSearching(false); 
    }
  };

  if (!user) return null;

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-xl mx-auto"
    >
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search Unsplash..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
}
