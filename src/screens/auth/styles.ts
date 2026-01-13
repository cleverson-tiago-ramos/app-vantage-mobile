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
    paddingHorizontal: spacing.screenHorizontal,
  },

  back: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  backText: {
    color: colors.primary,
    fontSize: 16,
  },

  logo: {
    width: "100%",
    height: 140,
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

  labelMargin: {
    marginTop: spacing.lg,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
  },
  inputFocused: {
    borderColor: colors.primary,
  },

  buttonDisabled: {
    opacity: 0.7,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    marginRight: spacing.sm,
  },

  eye: {
    fontSize: 18,
    paddingHorizontal: spacing.sm,
    color: "#777",
  },

  forgot: {
    color: colors.info,
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
    backgroundColor: colors.success,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    marginTop: spacing.xl,
    alignItems: "center",
  },

  buttonText: {
    color: colors.light,
    fontSize: 17,
    fontWeight: "600",
  },

  register: {
    marginTop: spacing.lg,
    textAlign: "center",
    color: "#999",
  },

  registerLink: {
    color: colors.info,
    fontWeight: "600",
  },
});
