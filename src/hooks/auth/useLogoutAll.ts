// src/hooks/auth/useLogoutAll.ts
import { apiClient } from "@/src/api/apiClient";
import { useToast } from "@/src/components/toast/ToastProvider";
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";

export function useLogoutAll() {
  const clearSession = useAuthStore((s) => s.clearSession);
  const { showToast } = useToast();

  async function logoutAll() {
    try {
      // 🔐 Backend invalida todas as sessões
      await apiClient.post("/auth/logout-all");
    } catch {
      // ignora erro (token pode já estar inválido)
    } finally {
      // 🧹 Limpa sessão local
      await clearSession();
      showToast("Sessão encerrada em todos os dispositivos", "info");
    }
  }

  return { logoutAll };
}
