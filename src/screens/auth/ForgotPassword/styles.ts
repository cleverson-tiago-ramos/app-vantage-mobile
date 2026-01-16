import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ============================
   * SAFE / CONTAINER
   * ============================ */
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  back: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },

  /* ============================
   * LOGO
   * ============================ */
  logo: {
    width: 160,
    height: 120,
    alignSelf: "center",
    marginBottom: 24,
  },

  /* ============================
   * FORM
   * ============================ */
  form: {
    backgroundColor: colors.light,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },

  /* ============================
   * INPUTS
   * ============================ */
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 6,
  },

  labelMargin: {
    marginTop: 16,
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

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    marginRight: 8,
  },

  /* ============================
   * ACTIONS
   * ============================ */
  forgot: {
    marginTop: 12,
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
    textAlign: "right",
  },

  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ============================
   * FEEDBACK
   * ============================ */
  error: {
    marginTop: 12,
    color: colors.error,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },

  success: {
    marginTop: 12,
    color: colors.success,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },

  /* ============================
   * LINKS
   * ============================ */
  backToLogin: {
    marginTop: 20,
    fontSize: 14,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "600",
  },

  register: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
    color: colors.textSecondary,
  },

  registerLink: {
    color: colors.primary,
    fontWeight: "700",
  },
});
