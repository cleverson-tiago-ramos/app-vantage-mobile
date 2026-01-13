// src/components/layout/styles.ts
import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.light,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.screenVertical,
  },
});
