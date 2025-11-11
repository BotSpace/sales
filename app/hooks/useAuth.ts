"use client";

import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated as checkAuth, getAuthToken, type User } from '../lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication on mount
    const checkAuthStatus = async () => {
      try {
        const currentUser = getCurrentUser();
        const token = getAuthToken();
        
        if (currentUser && token) {
          // Optionally verify token with backend
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      const updatedUser = getCurrentUser();
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    user,
    isAuthenticated: checkAuth(),
    loading,
  };
};
