
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole, AuthContextType } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '',
    role: 'admin' as UserRole,
    department: 'Administration',
    position: 'System Administrator',
    createdAt: '2023-01-01',
    lastLogin: '2023-09-15'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@example.com',
    avatar: '',
    role: 'user' as UserRole,
    department: 'Engineering',
    position: 'Software Developer',
    createdAt: '2023-02-15',
    lastLogin: '2023-09-10'
  }
];

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isAdmin: () => false,
  isAuthenticated: () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in (from session storage)
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const storedUser = sessionStorage.getItem('nudgeUser');
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse user from session storage', error);
          sessionStorage.removeItem('nudgeUser');
        }
      }
      
      setIsLoading(false);
    };
    
    checkUserLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') {
        // Update last login
        const authenticatedUser = {
          ...foundUser,
          lastLogin: new Date().toISOString()
        };
        
        setUser(authenticatedUser);
        
        // Store user in session storage
        sessionStorage.setItem('nudgeUser', JSON.stringify(authenticatedUser));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${authenticatedUser.name}!`,
        });
        
        // Redirect based on role
        if (authenticatedUser.role === 'admin') {
          navigate('/');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('nudgeUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
