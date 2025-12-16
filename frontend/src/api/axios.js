import axios from "axios";
import { BASE_URL } from "../api/apiConfig.js";

const api = axios.create({
  baseURL: BASE_URL, // backend base URL
  withCredentials: false,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
