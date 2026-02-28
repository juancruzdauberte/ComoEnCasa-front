import { create } from "zustand";
import type { User } from "../types/types";

interface UserStore {
  accessToken: string | undefined;
  user: User | null;
  viewMode: "admin" | "user";
  setViewMode: (mode: "admin" | "user") => void;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | undefined) => void;
  clearUser: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  viewMode: "admin",
  setViewMode: (mode) => set({ viewMode: mode }),
  accessToken: undefined,
  loading: true,
  setLoading: (loading) => set({ loading }),
  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, accessToken: undefined });
  },
  setAccessToken: (accessToken: string | undefined) => {
    if (accessToken) {
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      } else {
        localStorage.removeItem("token");
      }
      set({ accessToken });
    }
  },
}));
