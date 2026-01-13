// src/components/layout/ScreenContainer.tsx
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

interface Props {
  children: React.ReactNode;
}

export function ScreenContainer({ children }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}
