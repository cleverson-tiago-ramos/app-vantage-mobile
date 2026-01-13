// src/screens/home/HomeViewModel.ts
import { useAuthStore } from "@/src/store/auth.store";

export function useHomeViewModel() {
  const user = useAuthStore((s) => s.user);

  return {
    isLogged: !!user,
    user,
  };
}
