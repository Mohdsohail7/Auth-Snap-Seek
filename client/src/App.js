// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<HomePage />} />

          {/* Optional: redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
