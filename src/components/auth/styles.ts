// src/components/auth/AuthLayout/styles.ts
import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.light,
  },

  scroll: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: spacing.xl,
  },

  /* =====================
   * HEADER
   * ===================== */
  header: {
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  back: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: spacing.xs,
  },

  logo: {
    width: "100%",
    height: 90,
  },

  /* =====================
   * TITLES
   * ===================== */
  titleContainer: {
    marginBottom: spacing.lg,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },

  /* =====================
   * FORM
   * ===================== */
  form: {
    backgroundColor: colors.light,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
});
