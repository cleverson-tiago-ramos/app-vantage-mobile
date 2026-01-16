//src/hooks/auth/useLogout.ts
import { apiClient } from "@/src/api/apiClient";
import { useToast } from "@/src/components/toast/ToastProvider";
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";

export function useLogout() {
  const clearSession = useAuthStore((s) => s.clearSession);
  const { showToast } = useToast();

  async function logout() {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // ignora erro (token pode já estar inválido)
    } finally {
      await clearSession();
      showToast("Você saiu da sua conta", "info");
    }
  }

  return { logout };
}
