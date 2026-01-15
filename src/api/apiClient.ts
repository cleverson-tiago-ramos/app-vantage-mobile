// src/api/apiClient.ts
import { useAuthStore } from "@/src/store/auth.store";
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  config.headers["X-Client"] = "mobile";
  config.headers["X-Platform"] = "android";

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
