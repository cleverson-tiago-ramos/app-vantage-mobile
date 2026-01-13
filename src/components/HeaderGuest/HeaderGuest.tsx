// src/components/HeaderGuest/HeaderGuest.tsx
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

export function HeaderGuest() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Aproveite todas as vantagens do seu shopping
      </Text>

      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.link}>Entre ou cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
