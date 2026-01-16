// src/screens/auth/ForgotPassword/ForgotPasswordViewModel.ts
import { useForgotPassword } from "@/src/hooks/auth/useForgotPassword";
import { useConfirmDialog } from "@/src/hooks/ui/useConfirmDialog";
import { useEffect, useState } from "react";

export function useForgotPasswordViewModel() {
  const { forgotPassword, loading, error, success } = useForgotPassword();
  const dialog = useConfirmDialog();

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
  }

  // 🔥 reação correta ao sucesso (efeito colateral)
  useEffect(() => {
    if (success) {
      setIdentifier(""); // limpa campo
      dialog.open(); // abre ConfirmDialog
    }
  }, [success]);

  return {
    identifier,
    setIdentifier,

    focus,
    setFocus,

    submit,

    loading,
    error: localError || error,

    dialog, // 👈 EXPOSTO PARA A VIEW
  };
}
