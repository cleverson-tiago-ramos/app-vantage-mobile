import { AuthFormLayout } from "@/src/components/auth/AuthFormLayout/AuthFormLayout";
import { FormInput } from "@/src/components/form/FormInput";
import { FormSection } from "@/src/components/form/FormSection/FormSection";
import { Button } from "@/src/components/ui/buttons/Button/Button";
import { useForgotPasswordViewModel } from "./ForgotPasswordViewModel";

export function ForgotPasswordView() {
  const vm = useForgotPasswordViewModel();

  return (
    <AuthFormLayout
      title="Recuperar senha"
      subtitle="Informe seu e-mail ou CPF para receber as instruções"
    >
      <FormSection>
        <FormInput
          label="E-mail ou CPF"
          value={vm.identifier}
          onChangeText={vm.setIdentifier}
          error={vm.errors.identifier}
          autoCapitalize="none"
        />

        <Button
          title="Enviar instruções"
          loading={vm.loading}
          onPress={vm.submit}
        />
      </FormSection>
    </AuthFormLayout>
  );
}
