//src/hooks/auth/useLogout.ts
import { useAuthStore } from "@/src/store/auth.store";
import { useRouter } from "expo-router";

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);

  async function logout() {
    await clearSession();

    // Reseta a navegação (não permite voltar)
    router.replace("/(auth)/login");
  }

  return { logout };
}
