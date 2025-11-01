import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthResponse } from "../types";
import { authAPI } from "../api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<AuthResponse>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user data
  const fetchUserData = async (userToken: string) => {
    try {
      const result = await authAPI.getCurrentUser(userToken);
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If there's an error, clear the invalid token
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const result = await authAPI.verifyToken(storedToken);
        if (result.valid) {
          setToken(storedToken);
          await fetchUserData(storedToken);
        } else {
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const result = await authAPI.login(email, password);
    if (result.success && result.token && result.user) {
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem("token", result.token);
    }
    return result;
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> => {
    const result = await authAPI.signup(email, password, name);
    if (result.success && result.token && result.user) {
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem("token", result.token);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
