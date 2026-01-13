// src/screens/home/HomeLoggedView.tsx
import { HeaderLogged } from "@/src/components/HeaderLogged/HeaderLogged";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export function HomeLoggedView() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderLogged />
      <Text>Conteúdo do usuário logado</Text>
    </SafeAreaView>
  );
}
