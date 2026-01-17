import { useForgotPassword } from "@/src/hooks/auth/useForgotPassword";
import { useConfirmDialog } from "@/src/hooks/ui/useConfirmDialog";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useForgotPasswordViewModel() {
  const router = useRouter();
  const { forgotPassword, loading, error, success } = useForgotPassword();
  const dialog = useConfirmDialog();

  const [identifier, setIdentifier] = useState("");
  const [errors, setErrors] = useState<{ identifier?: string }>({});

  async function submit() {
    if (!identifier) {
      setErrors({ identifier: "Informe seu e-mail ou CPF" });
      return;
    }

    setErrors({});
    await forgotPassword(identifier);
  }

  // 🔥 AQUI acontece o redirect para o reset
  useEffect(() => {
    if (success) {
      dialog.open();
    }
  }, [success]);

  function goToReset() {
    router.replace({
      pathname: "/(auth)/reset-password",
      params: { identifier },
    });
  }

  return {
    identifier,
    setIdentifier,
    submit,
    loading,
    errors: {
      identifier: errors.identifier || error,
    },
    dialog,
    goToReset,
  };
}
