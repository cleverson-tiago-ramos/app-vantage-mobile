import { useToast } from "@/src/components/toast/ToastProvider";
import { loginService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { useState } from "react";

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(identifier: string, password: string) {
    setError(null);
    setLoading(true);

    try {
      const result = await loginService(identifier, password);

      await setSession(result.user, result.tokens.accessToken);

      showToast("Login realizado com sucesso!", "success");
    } catch (err) {
      setError("Credenciais inválidas");
      showToast("E-mail ou senha incorretos", "error");
      // ⛔ NÃO relança erro
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
