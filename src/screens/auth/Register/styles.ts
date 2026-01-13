import { colors } from "@/src/components/theme/colors";
import { spacing } from "@/src/components/theme/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.light },
  container: { flex: 1, paddingHorizontal: spacing.screenHorizontal },

  back: { marginTop: spacing.md },
  logo: {
    width: "100%",
    height: 120,
    marginVertical: spacing.xl,
  },

  form: { marginTop: spacing.sm },
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
  buttonDisabled: { opacity: 0.7 },
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
});
