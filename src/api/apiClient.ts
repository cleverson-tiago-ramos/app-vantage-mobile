// src/api/apiClient.ts
import { ENV } from "@/src/config/env";
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15000,
});

// ============================
// REQUEST → injeta token
// ============================
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// ============================
// RESPONSE → refresh automático
// ============================
let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const store = useAuthStore.getState();
      const { refreshToken } = store;

      if (!refreshToken) {
        await store.clearSession();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }).then(() => apiClient(originalRequest));
      }

      isRefreshing = true;

      try {
        const refreshResp = await apiClient.post("/mobile/v1/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = refreshResp?.data?.tokens?.accessToken;

        if (!newAccessToken) {
          throw new Error("Refresh sem accessToken");
        }

        await store.updateTokens(newAccessToken, refreshToken);

        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await store.clearSession();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
