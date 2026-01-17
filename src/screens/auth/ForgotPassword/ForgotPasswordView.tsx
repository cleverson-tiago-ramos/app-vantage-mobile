import { AuthFormLayout } from "@/src/components/auth/AuthFormLayout/AuthFormLayout";
import { FormInput } from "@/src/components/form/FormInput";
import { Button } from "@/src/components/ui/buttons/Button/Button";
import { useForgotPasswordViewModel } from "./ForgotPasswordViewModel";

export function ForgotPasswordView() {
  const vm = useForgotPasswordViewModel();

  return (
    <AuthFormLayout
      title="Recuperar senha"
      subtitle="Informe seu e-mail ou CPF para receber as instruções"
    >
      <FormInput
        label="E-mail ou CPF"
        value={vm.identifier}
        onChangeText={vm.setIdentifier}
        error={vm.errors.identifier}
      />

      <Button
        title="Enviar instruções"
        loading={vm.loading}
        onPress={vm.submit}
      />
    </AuthFormLayout>
  );
}
