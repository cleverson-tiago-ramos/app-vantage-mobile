// src/components/Home/QuickActions/styles.ts
import { colors } from "@/src/components/theme/colors";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  card: {
    width: "22%",
    backgroundColor: colors.light,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    elevation: 2,
  },
  icon: {
    fontSize: 22,
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    textAlign: "center",
    color: colors.textPrimary,
  },
});
