// src/screens/home/HomeLoggedView.tsx
import { HeaderLogged } from "@/src/components/HeaderLogged/HeaderLogged";
import { Text, View } from "react-native";
export function HomeLoggedView() {
  return (
    <View>
      <HeaderLogged />
      <Text>Conteúdo do usuário logado</Text>
    </View>
  );
}
