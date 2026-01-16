import { LogoutButton } from "@/src/components/ui/buttons/LogoutButton/LogoutButton";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
export function PromoBanner() {
  return (
    <View style={styles.container}>
      <LogoutButton />
      <Image
        source={require("@/assets/images/banners/banner-oculos.jpg")}
        style={styles.image}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ATIVAR SORTEIO</Text>
      </TouchableOpacity>
    </View>
  );
}
