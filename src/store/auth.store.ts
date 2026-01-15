import { User } from "@/src/domain/models/users/User";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  // login
  setSession: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;

  // refresh
  updateTokens: (accessToken: string, refreshToken: string) => Promise<void>;

  restoreSession: () => Promise<void>;
  clearSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  // LOGIN
  setSession: async (user, accessToken, refreshToken) => {
    console.log("[AUTH] setSession → salvando sessão completa");

    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await SecureStore.setItemAsync("user", JSON.stringify(user));

    set({ user, accessToken, refreshToken });

    console.log("[AUTH] setSession → estado atualizado");
  },

  // REFRESH
  updateTokens: async (accessToken, refreshToken) => {
    console.log("[AUTH] updateTokens → atualizando tokens");

    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);

    set({ accessToken, refreshToken });

    console.log("[AUTH] updateTokens → tokens atualizados");
  },

  restoreSession: async () => {
    console.log("[AUTH] restoreSession → iniciando");

    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const userRaw = await SecureStore.getItemAsync("user");

    const user = userRaw ? JSON.parse(userRaw) : null;

    set({ user, accessToken, refreshToken });

    console.log("[AUTH] restoreSession → estado restaurado");
  },

  clearSession: async () => {
    console.log("[AUTH] clearSession → limpando");

    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },
}));
