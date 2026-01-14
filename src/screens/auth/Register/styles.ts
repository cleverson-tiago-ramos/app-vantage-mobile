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

    position: "relative",
    width: "100%",
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
  },

  passwordInput: {
    flex: 1,
    marginRight: spacing.sm,
    width: "100%",
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 8,
  },
  iconEye: {
    right: 10,

    padding: 5,
    borderRadius: 5,
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
  required: {
    color: colors.error,
    fontSize: 16,
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
  helpText: {
    fontSize: 12,
    color: colors.textSecondary ?? "#777",
    marginTop: 4,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: spacing.md,
    gap: spacing.xs,
  },
  genderContainer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },

  genderOption: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    backgroundColor: colors.light,
  },

  genderOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  genderText: {
    fontSize: 14,
    color: colors.textPrimary,
  },

  genderTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  modalOptionActive: {
    backgroundColor: "#f5f7ff",
  },

  modalOptionText: {
    fontSize: 15,
    color: "#444",
  },

  modalOptionTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
});
