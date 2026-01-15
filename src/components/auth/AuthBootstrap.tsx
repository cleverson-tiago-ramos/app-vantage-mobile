// src/components/auth/AuthBootstrap.tsx
import { apiClient } from "@/src/api/apiClient";
import { useAuthStore } from "@/src/store/auth.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function AuthBootstrap() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const store = useAuthStore.getState();

      try {
        await store.restoreSession();

        const { accessToken } = useAuthStore.getState();

        if (!accessToken) {
          router.replace("/(auth)/login");
          return;
        }

        await apiClient.get("/mobile/v1/auth/me");
        router.replace("/(tabs)");
      } catch {
        await store.clearSession();
        router.replace("/(auth)/login");
      } finally {
        store.finishBootstrap();
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
