// src/screens/auth/ResetPassword/ResetPasswordViewModel.ts
import { useResetPassword } from "@/src/hooks/auth/useResetPassword";
import { useConfirmDialog } from "@/src/hooks/ui/useConfirmDialog";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";

type Errors = {
  identifier?: string;
  pin?: string;
  password?: string;
  confirmPassword?: string;
};

export function useResetPasswordViewModel() {
  const params = useLocalSearchParams<{ identifier?: string }>();

  const identifier = useMemo(
    () => params.identifier ?? "",
    [params.identifier],
  );

  const { resetPassword, loading, error, success } = useResetPassword();
  const dialog = useConfirmDialog();

  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({});

  async function submit() {
    const newErrors: Errors = {};

    if (!identifier)
      newErrors.identifier = "Identificador ausente. Volte e tente novamente.";
    if (pin.length !== 6) newErrors.pin = "O código deve conter 6 dígitos";
    if (password.length < 8) newErrors.password = "Mínimo de 8 caracteres";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "As senhas não conferem";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    await resetPassword({
      identifier,
      pin,
      password,
      password_confirmation: confirmPassword,
    });
  }

  useEffect(() => {
    if (success) {
      setPin("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      dialog.open();
    }
  }, [success, dialog]);

  return {
    identifier, // se você quiser mostrar em algum lugar
    pin,
    setPin,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,

    submit,
    loading,

    // backend error entra como identifier (padrão seu)
    errors: {
      ...errors,
      identifier: errors.identifier || error || undefined,
    },

    dialog,
  };
}
