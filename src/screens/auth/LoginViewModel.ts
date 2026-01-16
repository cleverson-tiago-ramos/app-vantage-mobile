import { useLogin } from "@/src/hooks/auth/useLogin";
import { useState } from "react";

export function useLoginViewModel() {
  const { login, loading, error } = useLogin();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState<"email" | "password" | null>(null);

  async function submit() {
    if (!identifier || !password) return;

    // 🔑 Apenas executa o login
    // A navegação será decidida pelo RootLayout
    await login(identifier, password);
  }

  return {
    identifier,
    password,
    loading,
    error,
    focus,
    setFocus,
    setIdentifier,
    setPassword,
    submit,
  };
}
