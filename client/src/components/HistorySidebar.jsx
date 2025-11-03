import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../api/apis';

export default function HistorySidebar() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const data = await fetchHistory();
      setHistory(data);
    };
    getHistory();
  }, []);

  return (
    <aside className="border border-gray-200 p-3 rounded-md w-full max-w-xs bg-white shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-2">Your Search History</h3>
      <div className="max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-gray-500 text-sm italic">No history yet</div>
        ) : (
          history.map((h) => (
            <div key={h._id} className="mb-3">
              <div className="font-medium text-gray-800">{h.term}</div>
              <div className="text-xs text-gray-500">
                {new Date(h.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
