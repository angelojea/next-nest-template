// axiosInstance.js
import axios from "axios";
import { cookies } from "next/headers";

// Dynamically set the base URL for the backend
const BASE_URL = process.env.BACKEND_URL || `http://localhost:4000`;

// Create an Axios instance with default configuration
const ssrHttpService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor
ssrHttpService.interceptors.request.use(
  (config) => {
    const token = cookies().get("aoj-token")?.value || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
ssrHttpService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default ssrHttpService;
