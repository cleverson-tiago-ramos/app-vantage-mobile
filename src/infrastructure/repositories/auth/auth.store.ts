// src/infrastructure/repositories/auth/auth.store.ts
import { BIOMETRIC_TTL_MS } from "@/src/config/security";
import { AuthStore } from "@/src/domain/repositories/auth/AuthStore";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  // ======================
  // DADOS
  // ======================
  user: null,
  accessToken: null,
  refreshToken: null,

  // ======================
  // ESTADOS
  // ======================
  isBootstrapping: true,
  isBiometricChecking: false,
  isBiometricVerified: false,
  requireBiometric: true,

  // ======================
  // SESSÃO
  // ======================
  setSession: async (user, accessToken, refreshToken) => {
    // 🔒 Validação defensiva (OBRIGATÓRIA)
    if (typeof accessToken !== "string") {
      throw new Error("accessToken inválido");
    }

    if (typeof refreshToken !== "string") {
      throw new Error("refreshToken inválido");
    }

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

  updateTokens: async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);

    set({ accessToken, refreshToken });
  },

  restoreSession: async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const userRaw = await SecureStore.getItemAsync("user");
    const biometricAt = await SecureStore.getItemAsync("biometricVerifiedAt");

    const biometricValid =
      biometricAt !== null &&
      Date.now() - Number(biometricAt) < BIOMETRIC_TTL_MS;

    set({
      user: userRaw ? JSON.parse(userRaw) : null,
      accessToken,
      refreshToken,
      isBiometricVerified: biometricValid,
    });
  },

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

  // ======================
  // BOOTSTRAP
  // ======================
  finishBootstrap: () => set({ isBootstrapping: false }),

  // ======================
  // BIOMETRIA
  // ======================
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
    set({
      isBiometricChecking: false,
      isBiometricVerified: false,
    });
  },
}));
