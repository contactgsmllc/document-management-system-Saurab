import axios from "axios";
import { BASE_URL } from "../api/apiConfig.js";

const PUBLIC_PATHS = ["/users/login", "/users/register", "/users/companies/list"];

function isPublicPath(url) {
  if (!url) return false;
  return PUBLIC_PATHS.some((path) => url.includes(path));
}

const api = axios.create({
  baseURL: BASE_URL, // backend base URL
  withCredentials: false,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && !isPublicPath(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error)
);

//handle expired token


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || "";

    //  Logout ONLY if token is expired / invalid
    if (
      status === 401 &&
      (message.toLowerCase().includes("expired") ||
       message.toLowerCase().includes("invalid token"))
    ) {
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    //  Otherwise just pass error to component
    return Promise.reject(error);
  }
);


export default api;


