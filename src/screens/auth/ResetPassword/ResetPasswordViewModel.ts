import { useResetPassword } from "@/src/hooks/auth/useResetPassword";
import { useConfirmDialog } from "@/src/hooks/ui/useConfirmDialog";
import { isValidCPF, maskCPF, onlyNumbers } from "@/src/utils/masks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

type Errors = {
  identifier?: string;
  pin?: string;
  password?: string;
  confirmPassword?: string;
};

export function useResetPasswordViewModel() {
  const router = useRouter();
  const params = useLocalSearchParams<{ identifier?: string }>();

  /**
   * Estado controlado do identifier
   */
  const [identifier, setIdentifier] = useState("");

  const { resetPassword, loading, error } = useResetPassword();
  const dialog = useConfirmDialog();

  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  /**
   * Preenche identifier vindo da rota (se existir)
   */
  useEffect(() => {
    if (params.identifier) {
      setIdentifier(params.identifier as string);
    }
  }, [params.identifier]);

  /**
   * Setter inteligente (CPF x Email)
   */
  function handleIdentifierChange(value: string) {
    // Se começou a digitar números → CPF
    if (/^[0-9.\-]*$/.test(value)) {
      setIdentifier(maskCPF(value));
      return;
    }

    // Caso contrário → e-mail normal
    setIdentifier(value.trim());
  }

  async function submit() {
    const newErrors: Errors = {};

    if (!identifier) {
      newErrors.identifier = "Informe o e-mail ou CPF.";
    }

    // Se for CPF, valida de verdade
    const rawIdentifier = onlyNumbers(identifier);
    if (rawIdentifier.length > 0 && rawIdentifier.length <= 11) {
      if (!isValidCPF(identifier)) {
        newErrors.identifier = "CPF inválido.";
      }
    }

    if (pin.length !== 6) {
      newErrors.pin = "O código deve conter 6 dígitos";
    }

    if (password.length < 8) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não conferem";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    /**
     * Normaliza CPF antes de enviar
     */
    const identifierToSend =
      rawIdentifier.length === 11 ? rawIdentifier : identifier;

    const ok = await resetPassword({
      identifier: identifierToSend,
      pin,
      password,
      password_confirmation: confirmPassword,
    });

    if (ok) {
      setPin("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
      dialog.open();
    }
  }

  function goToLogin() {
    router.replace("/(auth)/login");
  }

  return {
    identifier,
    setIdentifier: handleIdentifierChange,

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
      identifier: errors.identifier || error || undefined,
    },

    dialog,
    goToLogin,
  };
}
