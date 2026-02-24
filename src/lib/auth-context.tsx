'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  StoredUser,
  getCurrentUser,
  setCurrentUser,
  createUser,
  findUserByEmail,
  updateUser,
  storePassword,
  verifyPassword,
  initializeDemoData,
  logout as logoutStorage,
} from './storage';

interface AuthContextType {
  user: StoredUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string; user?: StoredUser }>;
  logout: () => void;
  updateProfile: (updates: Partial<StoredUser>) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  organization?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize on mount
  useEffect(() => {
    initializeDemoData();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const existingUser = findUserByEmail(email);
      
      if (!existingUser) {
        return { success: false, error: 'No account found with this email' };
      }
      
      // Verify password
      const isValid = verifyPassword(existingUser.id, password);
      
      // For demo accounts, accept "Demo1234"
      const isDemoAccount = email.toLowerCase().endsWith('@demo.com') && password === 'Demo1234';
      
      if (!isValid && !isDemoAccount) {
        return { success: false, error: 'Incorrect password' };
      }
      
      setCurrentUser(existingUser);
      setUser(existingUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      // Check if email exists
      const existing = findUserByEmail(data.email);
      if (existing) {
        return { success: false, error: 'An account with this email already exists' };
      }
      
      // Create user
      const newUser = createUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        organization: data.organization,
      });
      
      // Store password
      storePassword(newUser.id, data.password);
      
      // Auto-login
      setCurrentUser(newUser);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  }, []);

  const logout = useCallback(() => {
    logoutStorage();
    setUser(null);
    router.push('/login');
  }, [router]);

  const updateProfile = useCallback(async (updates: Partial<StoredUser>) => {
    if (!user) {
      return { success: false, error: 'Not logged in' };
    }
    
    try {
      const updated = updateUser(user.id, updates);
      if (updated) {
        setUser(updated);
        return { success: true };
      }
      return { success: false, error: 'Update failed' };
    } catch (error) {
      return { success: false, error: 'An error occurred' };
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// HOC for protected routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: string[]
) {
  return function WithAuthComponent(props: P) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      }
      
      if (!isLoading && isAuthenticated && allowedRoles && user) {
        if (!allowedRoles.includes(user.role)) {
          router.push('/unauthorized');
        }
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
