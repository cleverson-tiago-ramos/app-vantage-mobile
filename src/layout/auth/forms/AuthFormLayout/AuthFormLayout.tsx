//src/layout/auth/forms/AuthFormLayout/AuthFormLayout.tsx
import { colors } from "@/src/components/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AuthFormLayout({ title, subtitle, children }: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={router.back}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>

          <Image
            source={require("@/assets/images/logo_padrao.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>

          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}
