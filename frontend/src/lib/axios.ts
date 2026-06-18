import axios from "axios";

function buildBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL || "";
  const fallback = typeof window !== "undefined" ? window.location.origin : "";

  // Use env var if set, otherwise fallback to origin
  let url = raw || fallback;

  // Strip trailing slash
  url = url.replace(/\/+$/, "");

  // Ensure /api prefix is present (backend routes are mounted under /api)
  // Check if URL path already contains /api segment
  const hasApiPrefix = /\/api(\/|$)/.test(url);
  if (!hasApiPrefix) {
    url += "/api";
  }

  console.log("[Axios] API_BASE_URL =", url, "(raw env:", raw || "(not set)", "| origin:", fallback || "(ssr)");
  return url;
}

const API_BASE_URL = buildBaseUrl();

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
