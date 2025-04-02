
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, MOCK_USERS } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

type AuthContextType = {
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserEmail) {
      const user = MOCK_USERS.find(u => u.email === storedUserEmail);
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we just check if the email exists in our mock users
    // and ignore password verification (any password works)
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', user.role);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const hasRole = (role: UserRole): boolean => {
    return currentUser?.role === role;
  };

  const value = {
    currentUser,
    isLoggedIn,
    login,
    logout,
    hasRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
