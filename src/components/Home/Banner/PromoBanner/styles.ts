import { colors } from "@/src/components/theme/colors";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  button: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});
