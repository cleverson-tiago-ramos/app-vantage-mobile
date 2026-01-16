import { ConfirmDialog } from "@/src/components/ui/ConfirmDialog/ConfirmDialog";
import { useLogout } from "@/src/hooks/auth/useLogout";
import { useConfirmDialog } from "@/src/hooks/ui/useConfirmDialog";
import { Text, TouchableOpacity } from "react-native";

export function LogoutButton() {
  const { logout } = useLogout();
  const dialog = useConfirmDialog();

  return (
    <>
      <TouchableOpacity onPress={dialog.open}>
        <Text>Sair da conta</Text>
      </TouchableOpacity>

      <ConfirmDialog
        visible={dialog.visible}
        title="Sair da conta"
        message="Deseja realmente sair da sua conta?"
        confirmText="Sair"
        cancelText="Cancelar"
        destructive
        loading={dialog.loading}
        onCancel={dialog.close}
        onConfirm={() => dialog.confirm(logout)}
      />
    </>
  );
}
