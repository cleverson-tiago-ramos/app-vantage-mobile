//src/hooks/auth/useLogout.ts
import { useToast } from "@/src/components/toast/ToastProvider";
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";
import { useRouter } from "expo-router";

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);
  const { showToast } = useToast();
  async function logout() {
    await clearSession();

    showToast("Você saiu da sua conta", "info");
  }

  return { logout };
}
