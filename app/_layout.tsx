//app/_layout.tsx
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthBootstrap } from "@/src/components/auth/AuthBootstrap";
import { BiometricGate } from "@/src/components/auth/BiometricGate";
import { ToastProvider } from "@/src/components/toast/ToastProvider";
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const {
    isBootstrapping,
    isBiometricChecking,
    accessToken,
    requireBiometric,
    isBiometricVerified,
  } = useAuthStore();

  useEffect(() => {
    if (!isBootstrapping && !isBiometricChecking) {
      SplashScreen.hideAsync();
    }
  }, [isBootstrapping, isBiometricChecking]);

  return (
    <ToastProvider>
      <AuthBootstrap />

      {/* ✅ BIOMETRIA SÓ RODA UMA VEZ */}
      {accessToken && requireBiometric && !isBiometricVerified && (
        <BiometricGate />
      )}

      {!isBootstrapping &&
        !isBiometricChecking &&
        (accessToken && (!requireBiometric || isBiometricVerified) ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(public)" />
          </Stack>
        ))}

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ToastProvider>
  );
}
