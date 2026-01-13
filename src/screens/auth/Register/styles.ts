import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.light },
  container: { flex: 1, paddingHorizontal: spacing.screenHorizontal },
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
    height: 70, //
    marginVertical: spacing.md,
  },

  form: { marginTop: spacing.sm, paddingBottom: spacing.xl * 2 },
  label: { fontSize: 14, color: colors.textPrimary },
  labelMargin: { marginTop: spacing.lg },

  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: { flex: 1, marginRight: spacing.sm },

  button: {
    backgroundColor: colors.success,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    marginTop: spacing.xl,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: colors.gray,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  error: {
    color: colors.error,
    marginTop: spacing.sm,
    textAlign: "center",
  },

  loginLink: {
    marginTop: spacing.lg,
    textAlign: "center",
    color: "#999",
  },
  link: {
    color: colors.info,
    fontWeight: "600",
  },

  select: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    paddingVertical: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: colors.light,
  },

  selectText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});
