// app/_layout.tsx
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthBootstrap } from "@/src/components/auth/AuthBootstrap";
import { ToastProvider } from "@/src/components/toast/ToastProvider";
import { useAuthStore } from "@/src/store/auth.store";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// 🔒 Splash controlado manualmente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const isBootstrapping = useAuthStore((s) => s.isBootstrapping);
  const accessToken = useAuthStore((s) => s.accessToken);

  // 🔓 Libera splash quando bootstrap termina
  useEffect(() => {
    if (!isBootstrapping) {
      SplashScreen.hideAsync();
    }
  }, [isBootstrapping]);

  return (
    <ToastProvider>
      {/* SEMPRE executa */}
      <AuthBootstrap />

      {/* 🔑 Navegação baseada em estado */}
      {!isBootstrapping &&
        (accessToken ? (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        ))}

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ToastProvider>
  );
}
