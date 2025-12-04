import axios from "axios";

// Get the base URL from the environment variable (e.g., https://z-om-backend-4bod.onrender.com)
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Check if the environment variable is set in production
if (!apiBaseUrl && import.meta.env.PROD) {
  console.error("VITE_API_BASE_URL is not defined in the environment!");
  // Consider throwing an error or setting a default that will clearly fail
}

export const axiosInstance = axios.create({
  // Use the environment variable + /api for production, fallback to localhost for development
  baseURL: import.meta.env.PROD
    ? `${apiBaseUrl}/api` // ✅ ADDED /api prefix here
    : "http://localhost:5001/api", // Development URL already includes /api
  withCredentials: true, // Send cookies with requests
});

// Add request interceptor to include token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return successful responses
  (error) => {
    // Log detailed error information
    console.error("API Error:", {
        message: error.message,
        // config: error.config, // Request config can be verbose, uncomment if needed
        status: error.response?.status, // Response status
        response: error.response?.data // Response data if available
    });
    
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
      window.location.href = "/login";
    }
    
    // Reject the promise so downstream `.catch()` blocks can handle it
    return Promise.reject(error);
  }
);
