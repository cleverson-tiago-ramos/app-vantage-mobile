// src/components/HeaderGuest/styles.ts
import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.xl,
    backgroundColor: colors.secondary,
  },

  title: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  link: {
    color: colors.light,
    fontSize: 14,
    fontWeight: "500",
  },
});
