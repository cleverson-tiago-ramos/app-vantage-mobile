import { User } from "@/src/models/User";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  token: string | null;
  setSession: (user: User, token: string) => Promise<void>;
  clearSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  async setSession(user, token) {
    await SecureStore.setItemAsync("accessToken", token);
    set({ user, token });
  },

  async clearSession() {
    await SecureStore.deleteItemAsync("accessToken");
    set({ user: null, token: null });
  },
}));
