// axiosInstance.js
import axios from "axios";

// Create an Axios instance with default configuration
const httpService = axios.create({
  withCredentials: true,
});

// Request interceptor
httpService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
httpService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default httpService;
