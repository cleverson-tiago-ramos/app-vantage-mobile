import { FormInput } from "@/src/components/form/FormInput";
import { FormSection } from "@/src/components/form/FormSection/FormSection";
import { Button } from "@/src/components/ui/buttons/Button/Button";
import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog/ConfirmDialog";
import { AuthFormLayout } from "@/src/layout/auth/forms/AuthFormLayout/AuthFormLayout";
import * as Haptics from "expo-haptics";
import { useForgotPasswordViewModel } from "./ForgotPasswordViewModel";

export function ForgotPasswordView() {
  const vm = useForgotPasswordViewModel();

  return (
    <>
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

      {/* 🔔 CONFIRM + REDIRECT */}
      <ConfirmDialog
        visible={vm.dialog.visible}
        title="Recuperação de senha"
        message="Se os dados estiverem corretos, enviamos um código para você."
        confirmText="Continuar"
        cancelText="Cancelar"
        onCancel={vm.dialog.close}
        onConfirm={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          vm.dialog.close();
          vm.goToReset();
        }}
      />
    </>
  );
}
