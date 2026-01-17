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
    paddingTop: spacing.lg,
  },

  /* HEADER */
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
    position: "relative",
  },

  back: {
    position: "absolute",
    left: 0,
    top: 8,
  },

  logo: {
    width: 160,
    height: 80,
  },

  /* CARD */
  card: {
    backgroundColor: colors.light,
    borderRadius: 16,
    padding: spacing.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
});
