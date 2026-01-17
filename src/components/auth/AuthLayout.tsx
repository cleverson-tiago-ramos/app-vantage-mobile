// src/components/auth/AuthLayout/AuthLayout.tsx
import { colors } from "@/src/components/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

interface AuthLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  showBackButton = true,
}: AuthLayoutProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* =====================
             * HEADER
             * ===================== */}
            <View style={styles.header}>
              {showBackButton && (
                <TouchableOpacity
                  style={styles.back}
                  onPress={() => router.back()}
                >
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}

              <Image
                source={require("@/assets/images/logo_padrao.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* =====================
             * TÍTULO
             * ===================== */}
            {(title || subtitle) && (
              <View style={styles.titleContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              </View>
            )}

            {/* =====================
             * FORM CONTAINER
             * ===================== */}
            <View style={styles.form}>{children}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
