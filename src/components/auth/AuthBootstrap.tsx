// src/components/auth/AuthBootstrap.tsx
import { apiClient } from "@/src/api/apiClient";
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";
import { useEffect } from "react";

export function AuthBootstrap() {
  useEffect(() => {
    async function bootstrap() {
      const store = useAuthStore.getState();

      try {
        await store.restoreSession();

        const { accessToken } = useAuthStore.getState();

        // 👇 Se não tem token, apenas não valida /me
        if (accessToken) {
          await apiClient.get("/mobile/v1/auth/me");
        }
      } catch {
        await store.clearSession();
      } finally {
        store.finishBootstrap(); // 🔥 agora SEMPRE executa
      }
    }

    bootstrap();
  }, []);

  return null;
}
