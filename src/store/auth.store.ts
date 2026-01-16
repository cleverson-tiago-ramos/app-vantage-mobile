import { User } from "@/src/domain/models/users/User";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  setSession: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;

  updateAccessToken: (token: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  clearSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  // src/store/auth.store.ts
  setSession: async (user, accessToken, refreshToken) => {
    console.log("[AUTH] setSession → salvando tokens");
    console.log("[AUTH] accessToken:", accessToken);
    console.log("[AUTH] refreshToken:", refreshToken);

    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);

    set({ user, accessToken, refreshToken });

    console.log("[AUTH] setSession → estado atualizado");
  },

  updateAccessToken: async (token) => {
    await SecureStore.setItemAsync("accessToken", token);
    set({ accessToken: token });
  },

  restoreSession: async () => {
    console.log("[AUTH] restoreSession → iniciando");

    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    console.log("[AUTH] restoreSession → accessToken:", accessToken);
    console.log("[AUTH] restoreSession → refreshToken:", refreshToken);

    set({
      accessToken,
      refreshToken,
    });

    console.log("[AUTH] restoreSession → estado restaurado");
  },

  clearSession: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },
}));
