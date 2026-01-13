import { colors } from "@/src/components/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useRegisterViewModel } from "./RegisterViewModel";
import { styles } from "./styles";

export default function RegisterView() {
  const vm = useRegisterViewModel();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* HEADER FIXO */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>

            <Image
              source={require("@/assets/images/logo1x.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* FORM COM SCROLL */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.form}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={vm.name}
              onChangeText={vm.setName}
            />

            <Text style={styles.labelMargin}>E-mail</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              value={vm.email}
              onChangeText={vm.setEmail}
            />

            <Text style={styles.labelMargin}>CPF</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="000.000.000-00"
              value={vm.cpf}
              onChangeText={vm.setCpf}
            />

            <Text style={styles.labelMargin}>Data de nascimento</Text>
            <TextInput
              style={styles.input}
              placeholder="dd/mm/aaaa"
              keyboardType="numeric"
              value={vm.birthDate}
              onChangeText={vm.setBirthDate}
            />

            <Text style={styles.labelMargin}>Gênero</Text>
            <TouchableOpacity style={styles.select} onPress={vm.toggleGender}>
              <Text style={styles.selectText}>
                {vm.genderLabel || "Selecione"}
              </Text>
              <Ionicons name="chevron-down" size={18} color="#777" />
            </TouchableOpacity>

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
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
            <TouchableOpacity
              style={[
                styles.button,
                (!vm.isFormValid || vm.loading) && styles.buttonDisabled,
              ]}
              onPress={vm.submit}
              disabled={!vm.isFormValid || vm.loading}
            >
              {vm.loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
