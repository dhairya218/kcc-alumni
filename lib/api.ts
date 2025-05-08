import axios, { AxiosError } from "axios";

// Use environment variable for API URL or fallback to default
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Only add token if we're in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      // Network error
      console.error("Network Error Details:", {
        message: error.message,
        code: error.code,
        config: error.config
      });
      return Promise.reject({
        message: "Unable to connect to the server. Please check your internet connection and try again.",
        originalError: error
      });
    }
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      // Redirect to login
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);