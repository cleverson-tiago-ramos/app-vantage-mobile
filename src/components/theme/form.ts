// src/components/theme/form.ts
import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { spacing } from "./spacing";

export const formStyles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: colors.textPrimary,
  },

  labelMargin: {
    marginTop: spacing.lg,
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

  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },

  helpText: {
    fontSize: 12,
    color: colors.textSecondary ?? "#777",
    marginTop: 4,
  },
});
