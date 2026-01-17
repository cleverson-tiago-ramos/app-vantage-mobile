// src/components/form/PasswordInput/styles.ts
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
    marginBottom: 6,
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.light,
  },

  wrapperError: {
    borderColor: colors.error,
  },

  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: colors.error,
  },
});
