import { User } from "@/src/domain/models/users/User";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  isBootstrapping: boolean;

  setSession: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;

  updateTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  clearSession: () => Promise<void>;
  finishBootstrap: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  isBootstrapping: true,

  setSession: async (user, accessToken, refreshToken) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await SecureStore.setItemAsync("user", JSON.stringify(user));

    set({ user, accessToken, refreshToken });
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

    set({
      user: userRaw ? JSON.parse(userRaw) : null,
      accessToken,
      refreshToken,
    });
  },

  clearSession: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },

  finishBootstrap: () => set({ isBootstrapping: false }),
}));
