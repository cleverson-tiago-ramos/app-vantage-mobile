// src/components/ui/Button/styles.ts
import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.success,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },

  disabled: {
    opacity: 0.6,
    backgroundColor: colors.gray,
  },

  text: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "600",
  },
});
