import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== "undefined" ? window.location.origin + "/api" : "/api");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: [(data) => {
    if (!data || typeof data !== "string" || data.trim() === "") {
      return { success: true };
    }
    try {
      return JSON.parse(data);
    } catch {
      return { success: true, data };
    }
  }],
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const respData = error.response.data;
      const serverMsg = respData?.message || respData?.error || "";
      const message = serverMsg || `Server error (${status})`;
      console.error(`[Axios] ${error.config?.method?.toUpperCase()} ${error.config?.url} → ${status}: ${message}`);
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      const url = error.config?.baseURL || "";
      const path = error.config?.url || "";
      console.error(`[Axios] Network error — no response from ${url}${path}`);
      return Promise.reject(new Error("Network error. Please check your connection."));
    }
    console.error("[Axios] Request setup error:", error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
