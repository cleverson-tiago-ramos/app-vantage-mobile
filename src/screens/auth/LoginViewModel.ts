// src/screens/auth/LoginViewModel.ts
import { loginService } from "@/src/services/auth.service";
import { useAuthStore } from "@/src/stores/auth.store";
import { useState } from "react";

export function useLoginViewModel() {
  const setSession = useAuthStore((s) => s.setSession);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);

    if (!identifier || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const result = await loginService(identifier, password);
      await setSession(result.user, result.tokens.accessToken);
    } catch {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  }

  return {
    identifier,
    password,
    loading,
    error,
    setIdentifier,
    setPassword,
    submit,
  };
}
