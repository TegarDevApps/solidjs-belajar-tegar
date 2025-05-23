// utils/auth.ts
import { createSignal } from 'solid-js';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Create global auth state
const [authState, setAuthState] = createSignal<AuthState>({
  isAuthenticated: false,
  user: null,
  token: null
});

// Auth functions
export const getAuthState = () => authState();
export const isAuthenticated = () => authState().isAuthenticated;
export const getUser = () => authState().user;
export const getToken = () => authState().token;

// Set authentication state
export const setAuthenticated = (user: User, token: string) => {
  try {
    // Save to localStorage for persistence
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    
    setAuthState({
      isAuthenticated: true,
      user,
      token
    });
    
    console.log('Authentication set successfully');
  } catch (error) {
    console.error('Failed to save auth data:', error);
  }
};

// Clear authentication
export const logout = () => {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
    
    console.log('User logged out successfully');
    
    // Redirect to login
    window.location.href = '/login';
  } catch (error) {
    console.error('Error during logout:', error);
    // Force redirect even if there's an error
    window.location.href = '/login';
  }
};

// Initialize auth state from localStorage
export const initializeAuth = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (!token || !userData) {
      console.log('No auth data found in localStorage');
      return false;
    }

    // Parse user data
    let user: User;
    try {
      user = JSON.parse(userData);
    } catch (parseError) {
      console.error('Failed to parse user data:', parseError);
      // Clear corrupted data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      return false;
    }

    // Verify token with backend
    try {
      const response = await fetch('http://localhost:8080/api/verify-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update user data if backend provides updated info
        const finalUser = data.user || user;
        
        setAuthState({
          isAuthenticated: true,
          user: finalUser,
          token
        });
        
        console.log('Auth initialized successfully');
        return true;
      } else {
        console.warn('Token verification failed:', response.status);
        // Token invalid, clear storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        return false;
      }
    } catch (networkError) {
      console.error('Network error during token verification:', networkError);
      
      // If it's a network error, we might still want to allow offline access
      // with cached data (optional behavior)
      const allowOfflineAuth = true; // You can make this configurable
      
      if (allowOfflineAuth) {
        setAuthState({
          isAuthenticated: true,
          user,
          token
        });
        console.log('Auth initialized with cached data (offline mode)');
        return true;
      } else {
        // Clear data and require fresh login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        return false;
      }
    }
  } catch (error) {
    console.error('Auth initialization failed:', error);
    // Clear potentially corrupted data
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    } catch (clearError) {
      console.error('Failed to clear auth data:', clearError);
    }
    return false;
  }
};

// API call helper with auth
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized - token might be expired
    if (response.status === 401) {
      console.warn('Received 401 - token might be expired');
      logout(); // This will redirect to login
      throw new Error('Authentication required');
    }

    return response;
  } catch (error) {
    console.error('Authenticated fetch failed:', error);
    throw error;
  }
};

// Utility function to refresh token (if your backend supports it)
export const refreshToken = async (): Promise<boolean> => {
  const currentToken = getToken();
  if (!currentToken) return false;

  try {
    const response = await fetch('http://localhost:8080/api/refresh-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const currentUser = getUser();
      
      if (currentUser && data.token) {
        setAuthenticated(currentUser, data.token);
        console.log('Token refreshed successfully');
        return true;
      }
    }
    
    console.warn('Token refresh failed');
    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
};

// Auto-refresh token periodically (call this in your main app)
export const startTokenRefresh = (intervalMinutes: number = 30) => {
  const interval = setInterval(async () => {
    if (isAuthenticated()) {
      const success = await refreshToken();
      if (!success) {
        console.warn('Token refresh failed, user may need to re-login');
      }
    }
  }, intervalMinutes * 60 * 1000);

  return () => clearInterval(interval);
};