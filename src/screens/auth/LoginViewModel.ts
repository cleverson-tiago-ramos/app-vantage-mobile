import { useLogin } from "@/src/hooks/auth/useLogin";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useLoginViewModel() {
  const { login, loading, error } = useLogin();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState<"email" | "password" | null>(null);

  async function submit() {
    if (!identifier || !password) return;

    await login(identifier, password);

    // ✅ Redireciona apenas se o login não lançou erro
    router.replace("/(tabs)");
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
