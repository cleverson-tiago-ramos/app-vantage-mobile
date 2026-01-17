// src/screens/auth/ResetPassword/ResetPasswordView.tsx
import { FormInput } from "@/src/components/form/FormInput";
import { PasswordInput } from "@/src/components/form/PasswordInput/PasswordInput";
import { Button } from "@/src/components/ui/buttons/Button/Button";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog/ConfirmDialog";
import { AuthFormLayout } from "@/src/layout/auth/forms/AuthFormLayout/AuthFormLayout";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useResetPasswordViewModel } from "./ResetPasswordViewModel";

export function ResetPasswordView() {
  const vm = useResetPasswordViewModel();
  const router = useRouter();

  return (
    <>
      <AuthFormLayout
        title="Redefinir senha"
        subtitle="Informe o código (PIN) recebido e crie uma nova senha"
      >
        <FormInput
          label="Código (PIN)"
          value={vm.pin}
          onChangeText={vm.setPin}
          keyboardType="numeric"
          maxLength={6}
          error={vm.errors.pin}
        />

        <PasswordInput
          label="Nova senha"
          value={vm.password}
          onChangeText={vm.setPassword}
          error={vm.errors.password}
          marginTop
        />

        <PasswordInput
          label="Confirmar senha"
          value={vm.confirmPassword}
          onChangeText={vm.setConfirmPassword}
          error={vm.errors.confirmPassword}
          marginTop
        />

        <Button
          title="Redefinir senha"
          loading={vm.loading}
          onPress={vm.submit}
        />
      </AuthFormLayout>

      <ConfirmDialog
        visible={vm.dialog.visible}
        title="Senha redefinida"
        message="Sua senha foi alterada com sucesso. Faça login novamente."
        confirmText="OK"
        cancelText="Cancelar"
        loading={vm.dialog.loading}
        onCancel={vm.dialog.close}
        onConfirm={() =>
          vm.dialog.confirm(async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            vm.dialog.close();
            router.replace("/(auth)/login");
          })
        }
      />
    </>
  );
}
