import { AuthLayout } from "@/src/components/auth/AuthLayout";
import { FormInput } from "@/src/components/form/FormInput";
import { PasswordInput } from "@/src/components/form/PasswordInput/PasswordInput";
import { Button } from "@/src/components/ui/buttons/Button/Button";
import { useResetPasswordViewModel } from "./ResetPasswordViewModel";

export function ResetPasswordView() {
  const vm = useResetPasswordViewModel();

  return (
    <AuthLayout title="Redefinir senha">
      <FormInput
        label="E-mail ou CPF"
        value={vm.identifier}
        onChangeText={vm.setIdentifier}
        error={vm.errors.identifier}
      />

      <FormInput
        label="Código (PIN)"
        value={vm.pin}
        onChangeText={vm.setPin}
        keyboardType="numeric"
        maxLength={6}
        error={vm.errors.pin}
        marginTop
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
    </AuthLayout>
  );
}
