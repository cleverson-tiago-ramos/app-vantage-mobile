import { colors } from "@/src/components/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForgotPasswordViewModel } from "./ForgotPasswordViewModel";
import { styles } from "./styles";

export function ForgotPasswordView() {
  const vm = useForgotPasswordViewModel();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* 🔙 Back */}
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        {/* 🖼 Logo */}
        <Image
          source={require("@/assets/images/logo_padrao.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* 📄 FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>E-mail ou CPF</Text>

          <TextInput
            style={[
              styles.input,
              vm.focus === "identifier" && styles.inputFocused,
            ]}
            placeholder="Digite seu e-mail ou CPF"
            placeholderTextColor="#aaa"
            value={vm.identifier}
            onChangeText={vm.setIdentifier}
            onFocus={() => vm.setFocus("identifier")}
            onBlur={() => vm.setFocus(null)}
            autoCapitalize="none"
            editable={!vm.loading}
          />

          {/* ❌ ERRO */}
          {vm.error && <Text style={styles.error}>{vm.error}</Text>}

          {/* ✅ SUCESSO (AQUI ESTAVA FALTANDO) */}
          {vm.success && (
            <Text style={styles.success}>
              Se os dados estiverem corretos, enviaremos instruções.
            </Text>
          )}

          {/* 🔘 BOTÃO */}
          <TouchableOpacity
            style={[styles.button, vm.loading && styles.buttonDisabled]}
            onPress={vm.submit}
            disabled={vm.loading}
          >
            {vm.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar instruções</Text>
            )}
          </TouchableOpacity>

          {/* 🔗 Voltar */}
          <Text
            style={styles.register}
            onPress={() => router.replace("/(auth)/login")}
          >
            Voltar para o login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
