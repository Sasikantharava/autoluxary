import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, getProfile } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Verify token validity by getting user profile
        const userData = await getProfile();
        setUser(userData);
        setIsAuthenticated(true);
        setAuthError(null);
      } catch (error) {
        console.warn('Profile fetch failed, but keeping token:', error);
        
        // Don't logout immediately on profile fetch failure
        // Keep the token and let individual API calls handle auth errors
        setAuthError('Unable to verify session. Some features may not work.');
        
        // You can still consider the user authenticated if they have a token
        // The token validity will be checked on actual API calls
        setIsAuthenticated(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      setAuthError(null);
      
      return data;
    } catch (error) {
      setAuthError('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  const clearError = () => {
    setAuthError(null);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    authError,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export { AuthContext };