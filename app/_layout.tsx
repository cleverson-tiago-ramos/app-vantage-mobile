// app/_layout.tsx
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthBootstrap } from "@/src/components/auth/AuthBootstrap";
import { ToastProvider } from "@/src/components/toast/ToastProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ToastProvider>
      {/* 👇 ISSO AQUI RESOLVE O RELOAD */}
      <AuthBootstrap />

      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ToastProvider>
  );
}
