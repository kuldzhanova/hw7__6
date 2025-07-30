import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,

  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },

  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
    set({ refreshToken: token });
  },

  login: () => set({ isAuth: true }),

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null });
  }
}));
