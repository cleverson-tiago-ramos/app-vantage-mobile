// src/components/auth/AuthBootstrap.tsx
import { apiClient } from "@/src/api/apiClient";
import { useAuthStore } from "@/src/store/auth.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";

// src/components/auth/AuthBootstrap.tsx
export function AuthBootstrap() {
  const router = useRouter();

  useEffect(() => {
    async function bootstrap() {
      console.log("[BOOT] iniciando bootstrap");

      const store = useAuthStore.getState();

      await store.restoreSession();

      const { accessToken } = useAuthStore.getState();

      console.log("[BOOT] accessToken após restore:", accessToken);

      if (!accessToken) {
        console.log("[BOOT] sem token → login");
        router.replace("/(auth)/login");
        return;
      }

      try {
        console.log("[BOOT] validando token no backend (/me)");
        await apiClient.get("/mobile/v1/auth/me");

        console.log("[BOOT] token válido → tabs");
        router.replace("/(tabs)");
      } catch (err) {
        console.log("[BOOT] token inválido → limpando sessão");
        await store.clearSession();
        router.replace("/(auth)/login");
      }
    }

    bootstrap();
  }, []);

  return null;
}
