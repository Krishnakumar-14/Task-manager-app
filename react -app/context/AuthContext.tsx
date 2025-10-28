
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUserData: Partial<User>) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy API functions (to be replaced with actual API calls)
const api = {
  login: async (email: string, pass:string) => {
    // TODO: Replace with: `fetch('/api/auth/login', { ... })`
    console.log('API Call: login', { email, pass });
    await new Promise(res => setTimeout(res, 500));
    if (email === 'krishnakumargomadurai@gmail.com' && pass === 'password') {
      const user: User = { 
        id: 'user-1', 
        name: 'Krishnakumar', 
        email,
        phone: '8925493097' 
      };
      return { token: 'dummy-auth-token', user };
    }
    throw new Error('Invalid credentials');
  },
  register: async (name: string, email: string, pass: string) => {
    // TODO: Replace with: `fetch('/api/auth/register', { ... })`
    console.log('API Call: register', { name, email, pass });
    await new Promise(res => setTimeout(res, 500));
    const newUser: User = { id: `user-${Date.now()}`, name, email };
    return { token: 'dummy-new-user-token', user: newUser };
  },
  getUserProfile: async (token: string) => {
    // TODO: Replace with: `fetch('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })`
    console.log('API Call: getUserProfile with token', token);
    await new Promise(res => setTimeout(res, 300));
    if (token) {
        // In a real app, you would verify the token server-side and return the user
        return { 
          id: 'user-1', 
          name: 'Krishnakumar', 
          email: 'krishnakumargomadurai@gmail.com',
          phone: '8925493097' 
        };
    }
    throw new Error('Invalid token');
  },
  updateUserProfile: async (token: string, userData: Partial<User>) => {
    // TODO: Replace with: `fetch('/api/users/me', { method: 'PUT', ..., body: JSON.stringify(userData) })`
    console.log('API Call: updateUserProfile', { token, userData });
    await new Promise(res => setTimeout(res, 500));
    // The API would return the updated user object
    return { ...userData };
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const profile = await api.getUserProfile(token);
          setUser(profile);
        } catch (error) {
          console.error('Session validation failed', error);
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    validateSession();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const { token, user } = await api.login(email, pass);
      localStorage.setItem('authToken', token);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const { token, user } = await api.register(name, email, pass);
      localStorage.setItem('authToken', token);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  };

  const logout = () => {
    // In a real app, you might want to call an API to invalidate the token
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const updateUser = async (updatedUserData: Partial<User>) => {
    const token = localStorage.getItem('authToken');
    if (user && token) {
      try {
        await api.updateUserProfile(token, updatedUserData);
        const updatedUser = { ...user, ...updatedUserData };
        setUser(updatedUser);
      } catch (error) {
        console.error('Update user failed', error);
        // Optionally re-throw or handle error in UI
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
