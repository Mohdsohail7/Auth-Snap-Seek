import React, { createContext, useEffect, useState } from 'react';
import { fetchCurrentUser, logoutUser } from '../api/apis';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await fetchCurrentUser();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // logout
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      window.location.href = '/'; // redirect to home/login after logout
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh: fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
