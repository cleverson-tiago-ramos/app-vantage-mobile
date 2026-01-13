import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing.screenVertical,
  },

  back: {
    marginBottom: spacing.lg,
  },

  backText: {
    color: colors.primary,
    fontSize: 16,
  },

  logo: {
    width: "100%",
    height: 120,
    marginVertical: spacing.xl,
  },

  form: {
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
    borderRadius: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.textPrimary,
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  eye: {
    fontSize: 18,
    paddingHorizontal: spacing.sm,
    color: "#666",
  },

  forgot: {
    color: colors.primary,
    fontSize: 14,
    alignSelf: "flex-end",
    marginTop: spacing.sm,
  },

  error: {
    color: colors.error,
    marginTop: spacing.sm,
    textAlign: "center",
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 6,
    marginTop: spacing.lg,
    alignItems: "center",
  },

  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "600",
  },

  register: {
    marginTop: spacing.lg,
    textAlign: "center",
    color: "#666",
  },

  registerLink: {
    color: colors.primary,
    fontWeight: "600",
  },
});
