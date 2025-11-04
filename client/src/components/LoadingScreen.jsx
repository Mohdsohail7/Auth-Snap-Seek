import React from 'react';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        {/* Message */}
        <p className="mt-4 text-gray-600 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
