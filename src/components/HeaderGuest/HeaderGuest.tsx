// src/components/HeaderGuest.tsx
import { colors } from "@/src/components/theme/colors";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.dark,
  },
  title: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  link: {
    color: colors.primaryHover,
    fontSize: 14,
    fontWeight: "500",
  },
});
