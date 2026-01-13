//app/index.tsx
import { useAuthStore } from "@/src/user/auth.store";
import { Redirect } from "expo-router";
import { ActivityIndicator, Image, View } from "react-native";

export default function Index() {
  const user = useAuthStore((s) => s.user);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 140, height: 140, marginBottom: 24 }}
        resizeMode="contain"
      />

      <ActivityIndicator size="large" color="#F4B400" />

      {user ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/login" />}
    </View>
  );
}
