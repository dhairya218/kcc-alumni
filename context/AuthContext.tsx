"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "alumni";
  profilePicture?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Validate token and get user data
      fetchUserData(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async (authToken: string) => {
    try {
      setIsLoading(true);
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      setUser(response.data);
      setToken(authToken);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName}!`,
      });
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Invalid credentials. Please try again.";
      
      if (error instanceof AxiosError) {
        if (!error.response) {
          errorMessage = "Unable to connect to the server. Please check your internet connection.";
        } else if (error.response.status === 429) {
          errorMessage = "Too many attempts. Please try again later.";
        }
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      const response = await api.post("/auth/register", userData);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please log in.",
      });
      
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "There was an error during registration. Please try again.";
      
      if (error instanceof AxiosError) {
        if (!error.response) {
          errorMessage = "Unable to connect to the server. Please check your internet connection and try again.";
        } else if (error.response.status === 409) {
          errorMessage = "An account with this email already exists.";
        } else if (error.response.status === 400) {
          errorMessage = "Please check your input and try again.";
        }
      }
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    router.push("/");
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};