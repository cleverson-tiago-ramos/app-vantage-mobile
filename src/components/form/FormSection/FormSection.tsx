import { spacing } from "@/src/components/theme/spacing";
import { View } from "react-native";

export function FormSection({ children }: { children: React.ReactNode }) {
  return <View style={{ gap: spacing.md }}>{children}</View>;
}
