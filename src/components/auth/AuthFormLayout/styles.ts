// src/components/auth/AuthFormLayout/styles.ts
import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.light,
  },

  container: {
    flex: 1,
    padding: spacing.screenHorizontal,
  },

  header: {
    alignItems: "center",
    marginBottom: spacing.lg,
    flexDirection: "row",
  },
  arrowBack: {
    backgroundColor: "#2e7d32",
  },
  logo: {
    width: 160,
    height: 80,
    marginTop: spacing.md,
  },

  form: {
    backgroundColor: colors.light,
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  content: {
    gap: spacing.md,
  },
});
