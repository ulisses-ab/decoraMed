import React, { createContext, useState, useContext, useEffect } from 'react';
import { sendLogin, getUser } from './scripts/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const expiration = localStorage.getItem('expiration');
        const token = localStorage.getItem('token');
        if (!token) throw new Error();
        if (!expiration || expiration < Date.now()) throw new Error();
        setUser(await getUser(token));
        setIsLoggedIn(true);
      }
      catch (error) {
        setIsLoggedIn(false);
      }
    }
   
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    setIsLoggedIn(false);
    setUser({});
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);