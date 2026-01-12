// src/screens/home/HomeGuestView.tsx
import { HeaderGuest } from "@/src/components/HeaderGuest/HeaderGuest";
import { Text, View } from "react-native";

export function HomeGuestView() {
  return (
    <View>
      <HeaderGuest />
      <Text>Conteúdo para visitante</Text>
    </View>
  );
}
