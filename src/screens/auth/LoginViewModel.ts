// src/screens/auth/LoginViewModel.ts
import { useLogin } from "@/src/hooks/auth/useLogin";
import { useState } from "react";

export function useLoginViewModel() {
  const { login, loading, error } = useLogin();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    if (!identifier || !password) return;
    await login(identifier, password);
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
