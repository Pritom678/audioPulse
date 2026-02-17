import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Add timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("=== API Request ===");
    console.log("Method:", config.method?.toUpperCase());
    console.log("URL:", config.url);
    console.log("Base URL:", config.baseURL);
    console.log("With Credentials:", config.withCredentials);
    console.log("Headers:", config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for debugging and auth handling
api.interceptors.response.use(
  (response) => {
    console.log("=== API Response ===");
    console.log("Status:", response.status);
    console.log("URL:", response.config.url);
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    console.error("=== API Error ===");
    console.error("Message:", error.message);
    console.error("Response Status:", error.response?.status);
    console.error("Response Data:", error.response?.data);

    if (error.code === "NETWORK_ERROR") {
      console.error("Network error - server might be down");
    }

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const requestUrl = error.config?.url || "";

      console.log(
        "401 Error - Current path:",
        currentPath,
        "Request URL:",
        requestUrl,
      );

      // Don't redirect if already on login/signup pages
      if (currentPath.includes("/login") || currentPath.includes("/signup")) {
        console.log("Already on auth page, not redirecting");
        return Promise.reject(error);
      }

      // Don't auto-redirect on 401 - let components handle it
      // This prevents the cart page from redirecting when user IS logged in
      // but there's a temporary auth issue
      console.log("401 error - letting component handle it");
    }

    return Promise.reject(error);
  },
);

export default api;
