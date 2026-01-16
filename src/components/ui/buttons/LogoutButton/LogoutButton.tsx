// src/components/ui/buttons/LogoutButton/LogoutButton.tsx
import { useLogout } from "@/src/hooks/auth/useLogout";
import { Text, TouchableOpacity } from "react-native";

export function LogoutButton() {
  const { logout } = useLogout();

  return (
    <TouchableOpacity onPress={logout}>
      <Text>Sair da conta</Text>
    </TouchableOpacity>
  );
}
