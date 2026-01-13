import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* =========================
   * BASE
   * ========================= */
  safe: {
    flex: 1,
    backgroundColor: colors.light,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.screenHorizontal,
  },

  /* =========================
   * HEADER
   * ========================= */
  header: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  back: {
    position: "absolute",
    left: 0,
    top: 0,
  },

  logo: {
    width: "100%",
    height: 70,
    marginVertical: spacing.md,
  },

  /* =========================
   * FORM
   * ========================= */
  form: {
    marginTop: spacing.sm,
    paddingBottom: spacing.xl * 2, // espaço para o footer fixo
  },

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

  fieldError: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    marginRight: spacing.sm,
  },

  /* =========================
   * SELECT / DROPDOWN
   * ========================= */
  select: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.light,
  },

  selectText: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  /* =========================
   * ERRO GLOBAL
   * ========================= */
  error: {
    color: colors.error,
    marginTop: spacing.sm,
    textAlign: "center",
  },

  /* =========================
   * FOOTER FIXO
   * ========================= */
  footer: {
    paddingTop: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.light,
  },

  button: {
    backgroundColor: colors.success,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: colors.gray,
  },

  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "600",
  },

  /* =========================
   * LINKS AUXILIARES
   * ========================= */
  loginLink: {
    marginTop: spacing.lg,
    textAlign: "center",
    color: "#999",
  },

  link: {
    color: colors.info,
    fontWeight: "600",
  },
});
