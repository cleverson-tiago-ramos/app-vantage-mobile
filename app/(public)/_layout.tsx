// app/(public)/_layout.tsx
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";
import { Redirect, Stack } from "expo-router";

export default function PublicLayout() {
  const accessToken = useAuthStore((s) => s.accessToken);

  if (accessToken) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
