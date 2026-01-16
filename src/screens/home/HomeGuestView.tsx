// src/screens/home/HomeGuestView.tsx
import { HeaderGuest } from "@/src/components/HeaderGuest/HeaderGuest";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export function HomeGuestView() {
  console.log("Rendering HomeGuestView");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderGuest />
      <Text>Conteúdo para visitante</Text>
    </SafeAreaView>
  );
}
