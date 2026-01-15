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
      console.log("[BOOT] iniciando bootstrap");

      const store = useAuthStore.getState();

      // 1) Restaura tokens do SecureStore
      await store.restoreSession();

      const { accessToken, refreshToken } = useAuthStore.getState();

      console.log("[BOOT] accessToken após restore:", accessToken);

      // 2) Sem token: vai para login
      if (!accessToken) {
        console.log("[BOOT] sem token → login");
        if (!cancelled) router.replace("/(auth)/login");
        return;
      }

      // 3) Tenta validar no backend
      try {
        console.log("[BOOT] validando token no backend (/me)");
        await apiClient.get("/mobile/v1/auth/me");

        console.log("[BOOT] token válido → tabs");
        if (!cancelled) router.replace("/(tabs)");
        return;
      } catch (err: any) {
        const status = err?.response?.status;
        console.log("[BOOT] /me falhou status:", status);

        // Se não for 401, não faça logout automático
        if (status && status !== 401) {
          console.log(
            "[BOOT] erro não-auth → mantendo sessão e indo para login (ou tela de erro)"
          );
          if (!cancelled) router.replace("/(auth)/login");
          return;
        }

        // 4) Se for 401: tentar refresh antes de limpar sessão
        if (!refreshToken) {
          console.log("[BOOT] 401 e sem refreshToken → limpando sessão");
          await store.clearSession();
          if (!cancelled) router.replace("/(auth)/login");
          return;
        }

        try {
          console.log("[BOOT] 401 → tentando refresh");

          const refreshResp = await apiClient.post("/mobile/v1/auth/refresh", {
            refreshToken,
          });

          // 🔴 backend retorna accessToken dentro de "tokens"
          const newAccessToken = refreshResp?.data?.tokens?.accessToken;

          // 🔴 refreshToken NÃO muda no backend atual
          const newRefreshToken = refreshToken;

          if (!newAccessToken || !newRefreshToken) {
            throw new Error("Refresh não retornou tokens");
          }

          // Atualiza apenas os tokens
          await store.updateTokens(newAccessToken, newRefreshToken);

          console.log("[BOOT] refresh OK → revalidando /me");
          await apiClient.get("/mobile/v1/auth/me");

          console.log("[BOOT] revalidação OK → tabs");
          if (!cancelled) router.replace("/(tabs)");
          return;
        } catch (refreshErr) {
          console.log("[BOOT] refresh falhou → limpando sessão");
          await store.clearSession();
          if (!cancelled) router.replace("/(auth)/login");
          return;
        }
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return null;
}
