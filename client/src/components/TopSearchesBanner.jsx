import React, { useEffect, useState } from 'react';
import { fetchTopSearches } from '../api/apis';

export default function TopSearchesBanner() {
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopSearches = async () => {
      try {
        const data = await fetchTopSearches();
        setTop(data);
      } catch (error) {
        console.error('Failed to load top searches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTopSearches();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 p-3 sm:p-4 rounded-md shadow-sm text-center text-gray-500">
        Loading top searches...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-3 sm:p-4 rounded-md shadow-sm">
      <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
        Top searches:
      </h2>

      <div className="flex flex-wrap gap-2 mt-2">
        {top.length > 0 ? (
          top.map((t) => (
            <span
              key={t.term}
              className="px-3 py-1.5 bg-white rounded-md shadow-sm text-sm text-gray-700 hover:bg-blue-50 transition"
            >
              {t.term} <span className="text-gray-500">({t.count})</span>
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm italic">
            No searches yet
          </span>
        )}
      </div>
    </div>
  );
}
