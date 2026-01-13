import { colors } from "@/src/components/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginViewModel } from "./LoginViewModel";
import { styles } from "./styles";
export function LoginView() {
  const vm = useLoginViewModel();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/(tabs)");
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Image
          source={require("@/assets/images/logo_padrao.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, vm.focus === "email" && styles.inputFocused]}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#aaa"
            value={vm.identifier}
            onChangeText={vm.setIdentifier}
            onFocus={() => vm.setFocus("email")}
            onBlur={() => vm.setFocus(null)}
            autoCapitalize="none"
          />

          <Text style={[styles.label, styles.labelMargin]}>Senha</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                vm.focus === "password" && styles.inputFocused,
              ]}
              placeholder="Digite sua senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={vm.password}
              onChangeText={vm.setPassword}
              onFocus={() => vm.setFocus("password")}
              onBlur={() => vm.setFocus(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          {vm.error && <Text style={styles.error}>{vm.error}</Text>}

          <TouchableOpacity
            style={[styles.button, vm.loading && styles.buttonDisabled]}
            onPress={vm.submit}
            disabled={vm.loading}
          >
            {vm.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <Text
            style={styles.register}
            onPress={() => router.push("/(auth)/register")}
          >
            Primeiro acesso?{" "}
            <Text style={styles.registerLink}>Cadastre-se</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
