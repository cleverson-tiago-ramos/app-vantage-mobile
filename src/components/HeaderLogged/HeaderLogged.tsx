// src/components/HeaderLogged/HeaderLogged.tsx
import { colors } from "@/src/components/theme/colors";

import { useAuthStore } from "@/src/user/auth.store";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function HeaderLogged() {
  const user = useAuthStore((s) => s.user);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{user?.name}</Text>
      </View>

      <TouchableOpacity style={styles.notification}>
        <Text style={styles.notificationText}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.light,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  notification: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.gray,
  },
  notificationText: {
    fontSize: 18,
  },
});
