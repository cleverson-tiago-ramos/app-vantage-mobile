// src/components/Home/UnlockBenefitsCard/UnlockBenefitsCard.tsx
import { colors } from "@/src/components/theme/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function UnlockBenefitsCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.stars}>⭐ ⭐ ⭐</Text>

      <Text style={styles.title}>Desbloqueie benefícios</Text>
      <Text style={styles.description}>
        Envie notas fiscais e participe do Programa de benefícios
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar nota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.light,
    alignItems: "center",
  },
  stars: {
    fontSize: 16,
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
