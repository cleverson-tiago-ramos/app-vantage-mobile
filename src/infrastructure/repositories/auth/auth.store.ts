import { BIOMETRIC_TTL_MS } from "@/src/config/security";
import { AuthStore } from "@/src/domain/auth/AuthStore";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  isBootstrapping: true,
  isBiometricChecking: false,
  isBiometricVerified: false,
  requireBiometric: true,

  // =========================
  // LOGIN
  // =========================
  setSession: async (user, accessToken, refreshToken) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await SecureStore.setItemAsync("user", JSON.stringify(user));

    await SecureStore.deleteItemAsync("biometricVerifiedAt");

    set({
      user,
      accessToken,
      refreshToken,
      isBiometricVerified: false,
    });
  },

  // =========================
  // REFRESH
  // =========================
  updateTokens: async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);

    set({ accessToken, refreshToken });
  },

  // =========================
  // BOOTSTRAP
  // =========================
  restoreSession: async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const userRaw = await SecureStore.getItemAsync("user");
    const biometricAt = await SecureStore.getItemAsync("biometricVerifiedAt");

    let biometricValid = false;

    if (biometricAt) {
      biometricValid = Date.now() - Number(biometricAt) < BIOMETRIC_TTL_MS;
    }

    set({
      user: userRaw ? JSON.parse(userRaw) : null,
      accessToken,
      refreshToken,
      isBiometricVerified: biometricValid,
    });
  },

  finishBootstrap: () => set({ isBootstrapping: false }),

  // =========================
  // BIOMETRIA
  // =========================
  startBiometricCheck: () =>
    set({ isBiometricChecking: true, isBiometricVerified: false }),

  verifyBiometric: async () => {
    await SecureStore.setItemAsync(
      "biometricVerifiedAt",
      Date.now().toString()
    );

    set({
      isBiometricChecking: false,
      isBiometricVerified: true,
    });
  },

  failBiometric: async () => {
    await SecureStore.deleteItemAsync("biometricVerifiedAt");
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isBiometricChecking: false,
      isBiometricVerified: false,
    });
  },

  // =========================
  // LOGOUT
  // =========================
  clearSession: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("biometricVerifiedAt");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isBiometricVerified: false,
    });
  },
}));
