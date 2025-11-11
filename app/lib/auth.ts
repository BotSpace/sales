// Authentication utility functions

export interface User {
  id?: number;
  phone: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  full_name?: string;
  role?: string;
  isAuthenticated: boolean;
}

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

// Save auth token to localStorage
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

// Remove auth token
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Save user to localStorage
export const saveUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const user = getCurrentUser();
  return !!(token && user?.isAuthenticated);
};

// Login user - save token and user data
export const loginUser = (token: string, userData: any): void => {
  setAuthToken(token);
  const user: User = {
    id: userData.id,
    phone: userData.phone,
    username: userData.username,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    full_name: userData.full_name || `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
    role: userData.role,
    isAuthenticated: true,
  };
  saveUser(user);
};

// Logout user
export const logoutUser = (): void => {
  removeAuthToken();
  localStorage.removeItem('user');
  localStorage.removeItem('redirectAfterLogin');
};

// Save redirect path
export const saveRedirectPath = (path: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('redirectAfterLogin', path);
  }
};

// Get and clear redirect path
export const getAndClearRedirectPath = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const path = localStorage.getItem('redirectAfterLogin');
  if (path) {
    localStorage.removeItem('redirectAfterLogin');
    return path;
  }
  return null;
};

// Require authentication - redirect to /auth if not authenticated
export const requireAuth = (currentPath?: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  if (!isAuthenticated()) {
    // Save current path for redirect after login
    if (currentPath) {
      saveRedirectPath(currentPath);
    }
    window.location.href = '/auth';
    return false;
  }
  return true;
};
