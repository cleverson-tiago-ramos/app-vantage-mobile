// src/screens/auth/ForgotPassword/ForgotPasswordViewModel.ts
import { useForgotPassword } from "@/src/hooks/auth/useForgotPassword";
import { useState } from "react";

export function useForgotPasswordViewModel() {
  const { forgotPassword, loading, error, success } = useForgotPassword();

  const [identifier, setIdentifier] = useState("");
  const [focus, setFocus] = useState<"identifier" | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  async function submit() {
    if (!identifier) {
      setLocalError("Informe seu e-mail ou CPF");
      return;
    }

    setLocalError(null);
    await forgotPassword(identifier);

    if (!error) {
      setIdentifier("");
    }
  }

  return {
    identifier,
    loading,
    error: localError || error,
    success,
    focus,
    setFocus,
    setIdentifier,
    submit,
  };
}
