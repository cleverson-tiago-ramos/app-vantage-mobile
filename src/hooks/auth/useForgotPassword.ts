// src/hooks/auth/useForgotPassword.ts
import { apiClient } from "@/src/api/apiClient";
import { useState } from "react";

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function forgotPassword(identifier: string) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await apiClient.post("/mobile/v1/auth/forgot-password", {
        identifier,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Erro ao solicitar recuperação de senha"
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    forgotPassword,
    loading,
    error,
    success,
  };
}
