import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { decode } from 'jsonwebtoken';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around the application
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() =>{
    const token = localStorage.getItem('token');
    if(token) {
      const decoded = jwt_decode(token);
      setAuth({id: decoded.id, email: decoded.email, number: decoded.number});
    }
  },[]);

 const login = (token) => {
  localStorage.setItem('token', token);
  const decoded = jwt_decode(token);
  setAuth({id: decode.id, email: decode.email, number: decode.number});
  navigate('/dashboard');
  // localStorage.setItem('auth', token);
 };

 const logout = () => {
  localStorage.removeItem('token');
  setAuth(null);
  navigate('/login');
 };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
// export const useAuth = () => useContext(AuthContext);
