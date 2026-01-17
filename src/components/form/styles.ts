// src/components/form/FormInput/styles.ts
import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  marginTop: {
    marginTop: spacing.lg,
  },

  label: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.light,
  },

  inputError: {
    borderColor: colors.error,
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: colors.error,
  },
});
