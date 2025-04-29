import React, { createContext, useState, useContext, useEffect } from 'react';
import { sendLogin, getUser } from './scripts/auth';
import { getUserDecks } from './scripts/decks';

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
        const ud = await getUserDecks(token, user.rootDeckId);
        const userDecksObj = {};
        ud.forEach(deck => {
          localStorage.setItem(deck._id, JSON.stringify(deck));
        });
      }
      catch (error) {
        setIsLoggedIn(false);
      }
    }
    fetchUser();


  }, []);

  const logout = () => {
    localStorage.clear();
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