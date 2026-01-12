// src/api/apiClient.ts
import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-Client"] = "mobile";
  config.headers["X-Platform"] = "android";

  return config;
});
