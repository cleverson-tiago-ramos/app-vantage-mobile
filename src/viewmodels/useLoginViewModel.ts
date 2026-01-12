import { loginService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/stores/auth.store";
import { useState } from "react";

export function useLoginViewModel() {
  const setSession = useAuthStore((s) => s.setSession);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(identifier: string, password: string) {
    try {
      setLoading(true);
      setError(null);

      const result = await loginService(identifier, password);
      await setSession(result.user, result.tokens.accessToken);

      return true;
    } catch {
      setError("Credenciais inválidas");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
    error,
  };
}
