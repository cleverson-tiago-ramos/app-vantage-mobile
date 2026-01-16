//app/index.tsx
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";
import { Redirect } from "expo-router";

/**
 * Entry point da aplicação.
 * Responsável apenas por redirecionar o usuário
 * com base no estado de autenticação.
 */
export default function Index() {
  const user = useAuthStore((s) => s.user);

  // Se estiver logado, vai para o app principal
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  // Caso contrário, vai para o fluxo de autenticação
  return <Redirect href="/(auth)/login" />;
}
