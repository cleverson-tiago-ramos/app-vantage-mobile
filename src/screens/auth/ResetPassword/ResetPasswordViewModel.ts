import { useResetPassword } from "@/src/hooks/auth/useResetPassword";
import { useConfirmDialog } from "@/src/hooks/ui/useConfirmDialog";
import { usePasswordValidation } from "@/src/hooks/validation/usePasswordValidation";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

type Errors = {
  identifier?: string;
  pin?: string;
  password?: string;
  confirmPassword?: string;
};

export function useResetPasswordViewModel() {
  const params = useLocalSearchParams<{ identifier?: string }>();
  const { resetPassword, loading, error, success } = useResetPassword();
  const dialog = useConfirmDialog();

  /* ======================
   * STATE
   * ====================== */
  const [identifier, setIdentifier] = useState(params.identifier ?? "");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({});

  /* ======================
   * PASSWORD VALIDATION
   * ====================== */
  const { isStrong } = usePasswordValidation(password);

  /* ======================
   * SUBMIT
   * ====================== */
  async function submit() {
    const newErrors: Errors = {};

    if (!identifier) {
      newErrors.identifier = "Informe seu e-mail ou CPF";
    }

    if (pin.length !== 6) {
      newErrors.pin = "O código deve conter 6 dígitos";
    }

    if (!isStrong) {
      newErrors.password =
        "Senha fraca. Use no mínimo 8 caracteres, letra maiúscula, número e símbolo.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não conferem";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    await resetPassword({
      identifier,
      pin,
      password,
      password_confirmation: confirmPassword,
    });
  }

  /* ======================
   * SUCCESS EFFECT
   * ====================== */
  useEffect(() => {
    if (success) {
      setPin("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      dialog.open();
    }
  }, [success]);

  /* ======================
   * PUBLIC API
   * ====================== */
  return {
    identifier,
    setIdentifier,

    pin,
    setPin,

    password,
    setPassword,

    confirmPassword,
    setConfirmPassword,

    submit,

    loading,
    errors: {
      ...errors,
      identifier: errors.identifier || error,
    },

    dialog,
  };
}
