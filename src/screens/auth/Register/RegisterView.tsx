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
import { useRegisterViewModel } from "./RegisterViewModel";
import { styles } from "./styles";

export function RegisterView() {
  const vm = useRegisterViewModel();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Image
          source={require("@/assets/images/logo_padrao.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={vm.name}
            onChangeText={vm.setName}
          />

          <Text style={styles.labelMargin}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            value={vm.email}
            onChangeText={vm.setEmail}
          />

          <Text style={styles.labelMargin}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={vm.cpf}
            onChangeText={vm.setCpf}
          />

          <Text style={styles.labelMargin}>Senha</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              secureTextEntry={!showPassword}
              value={vm.password}
              onChangeText={vm.setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.labelMargin}>Confirmar senha</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              secureTextEntry={!showConfirm}
              value={vm.confirmPassword}
              onChangeText={vm.setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? "eye-off" : "eye"}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>

          {vm.error && <Text style={styles.error}>{vm.error}</Text>}

          <TouchableOpacity
            style={[styles.button, vm.loading && styles.buttonDisabled]}
            onPress={vm.submit}
            disabled={vm.loading}
          >
            {vm.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.loginLink}>
              Já tem conta? <Text style={styles.link}>Faça login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
