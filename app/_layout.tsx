// app/_layout.tsx
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthBootstrap } from "@/src/components/auth/AuthBootstrap";
import { ToastProvider } from "@/src/components/toast/ToastProvider";
import { useAuthStore } from "@/src/store/auth.store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping);

  return (
    <ToastProvider>
      {/* 👇 SEMPRE RENDERIZA */}
      <AuthBootstrap />

      {isBootstrapping ? (
        // 👇 BLOQUEIA APENAS AS ROTAS
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      )}

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ToastProvider>
  );
}
