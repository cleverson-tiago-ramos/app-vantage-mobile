// src/screens/auth/ForgotPassword/ForgotPasswordView.tsx
import { AuthLayout } from "@/src/components/auth/AuthLayout";
import { FormInput } from "@/src/components/form/FormInput";
import { Button } from "@/src/components/ui/buttons/Button/Button";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog/ConfirmDialog";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useForgotPasswordViewModel } from "./ForgotPasswordViewModel";

export function ForgotPasswordView() {
  const vm = useForgotPasswordViewModel();
  const router = useRouter();

  return (
    <>
      <AuthLayout title="Recuperar senha">
        <FormInput
          label="E-mail ou CPF"
          value={vm.identifier}
          onChangeText={vm.setIdentifier}
          autoCapitalize="none"
          error={vm.errors.identifier}
        />

        <Button
          title="Enviar instruções"
          loading={vm.loading}
          onPress={vm.submit}
        />
      </AuthLayout>

      {/* ✅ CONFIRM DIALOG — PADRÃO UNIFICADO */}
      <ConfirmDialog
        visible={vm.dialog.visible}
        title="Recuperação de senha"
        message="Se os dados estiverem corretos, enviaremos as instruções por e-mail."
        confirmText="OK"
        cancelText="Cancelar"
        loading={vm.dialog.loading}
        onCancel={vm.dialog.close}
        onConfirm={() =>
          vm.dialog.confirm(async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            vm.dialog.close();

            router.replace({
              pathname: "/(auth)/reset-password",
              params: { identifier: vm.identifier },
            });
          })
        }
      />
    </>
  );
}
