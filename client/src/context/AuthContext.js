import React, { createContext, useEffect, useState } from 'react';
import { fetchCurrentUser } from '../api/apis';

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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
