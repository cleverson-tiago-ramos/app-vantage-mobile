import { colors } from "@/src/components/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },
  message: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.info,
    borderRadius: 8,
  },
  cancelText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  destructiveButton: {
    backgroundColor: colors.danger,
  },
  confirmText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
