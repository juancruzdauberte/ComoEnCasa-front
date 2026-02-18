import axios from "axios";
import { isTokenNearExpiry } from "../utils/utilsFunction";
import { userStore } from "../store/userStore";
import type { RefreshResponse } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    let token = userStore.getState().accessToken;
    if (config.url?.includes("/auth/refresh")) return config;

    if (token && isTokenNearExpiry(token, 90)) {
      const { data } = await api.post<RefreshResponse>("/auth/refresh");
      token = data.accessToken;
      userStore.getState().setAccessToken(token!);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
