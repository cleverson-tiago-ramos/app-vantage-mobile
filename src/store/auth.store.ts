import { BIOMETRIC_TTL_MS } from "@/src/config/security";
import { User } from "@/src/domain/models/users/User";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  isBootstrapping: boolean;
  isBiometricChecking: boolean;
  isBiometricVerified: boolean;
  requireBiometric: boolean;

  setSession: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;

  updateTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  clearSession: () => Promise<void>;

  finishBootstrap: () => void;

  startBiometricCheck: () => void;
  verifyBiometric: () => Promise<void>;
  failBiometric: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
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

    // 🔐 sempre exigir biometria após login
    await SecureStore.deleteItemAsync("biometricVerifiedAt");

    set({
      user,
      accessToken,
      refreshToken,
      isBiometricVerified: false,
    });
  },

  // =========================
  // REFRESH TOKEN
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
      const diff = Date.now() - Number(biometricAt);
      biometricValid = diff < BIOMETRIC_TTL_MS;
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
    set({
      isBiometricChecking: true,
      isBiometricVerified: false,
    }),

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
