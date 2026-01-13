import { User } from "@/src/models/users/User";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setSession: (user: User, token: string) => Promise<void>;
  clearSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setSession: async (user, token) => {
    await SecureStore.setItemAsync("accessToken", token);
    set({ user, accessToken: token });
  },

  clearSession: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    set({ user: null, accessToken: null });
  },
}));
