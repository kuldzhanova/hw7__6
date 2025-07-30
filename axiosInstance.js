import axios from "axios";
import { useAuthStore } from "./src/features/auth/model/useAuthStore";
// import { useAuthStore } from "../features/auth/model/useAuthStore";

export const API = axios.create({
  baseURL: "http://34.30.198.185/api",
  // withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = useAuthStore.getState().refreshToken;
      if (!refreshToken) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await API.post("/auth/refresh", {
          refreshToken: refreshToken
        });

        const newAccessToken = res.data.token.accessToken;
        const newRefreshToken = res.data.token.refreshToken;

        useAuthStore.getState().setAccessToken(newAccessToken);
        useAuthStore.getState().setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
