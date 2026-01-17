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

  async function resetPassword(
    payload: ResetPasswordPayload,
  ): Promise<boolean> {
    try {
      setLoading(true);
      setError(null);

      await apiClient.post("/mobile/v1/auth/reset-password", payload);

      return true;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Erro ao redefinir a senha. Tente novamente.",
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    resetPassword,
    loading,
    error,
  };
}
