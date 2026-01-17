// src/hooks/auth/useResetPassword.ts
import { apiClient } from "@/src/api/apiClient";
import { useState } from "react";

interface ResetPasswordPayload {
  identifier: string;
  pin: string;
  password: string;
  password_confirmation: string;
}

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function resetPassword(payload: ResetPasswordPayload) {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await apiClient.post("/mobile/v1/auth/reset-password", payload);

      setSuccess(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Erro ao redefinir a senha. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    resetPassword,
    loading,
    error,
    success,
  };
}
