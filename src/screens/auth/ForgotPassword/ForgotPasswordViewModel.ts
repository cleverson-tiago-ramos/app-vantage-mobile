// src/screens/auth/ForgotPassword/ForgotPasswordViewModel.ts
import { useForgotPassword } from "@/src/hooks/auth/useForgotPassword";
import { useConfirmDialog } from "@/src/hooks/ui/useConfirmDialog";
import { useEffect, useState } from "react";

type Errors = {
  identifier?: string;
};

export function useForgotPasswordViewModel() {
  const { forgotPassword, loading, error, success } = useForgotPassword();
  const dialog = useConfirmDialog();

  const [identifier, setIdentifier] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  async function submit() {
    const newErrors: Errors = {};

    if (!identifier) {
      newErrors.identifier = "Informe seu e-mail ou CPF";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    await forgotPassword(identifier);
  }

  useEffect(() => {
    if (success) {
      setErrors({});
      dialog.open();
    }
  }, [success]);

  return {
    identifier,
    setIdentifier,

    submit,

    loading,
    errors: {
      ...errors,
      identifier: errors.identifier || error,
    },

    dialog,
  };
}
