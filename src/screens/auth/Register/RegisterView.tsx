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

import { maskCPF, maskDate } from "@/src/utils/masks";
import { GenderSelectModal } from "./GenderSelectModal";
import { useRegisterViewModel } from "./RegisterViewModel";
import { styles } from "./styles";

export default function RegisterView() {
  const vm = useRegisterViewModel();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* =======================
           * HEADER FIXO
           * ======================= */}
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

          {/* =======================
           * FORMULÁRIO (SCROLL)
           * ======================= */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.form}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              {/* NOME */}
              <Text style={styles.label}>
                Nome completo<Text style={styles.fieldError}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, vm.errors.name && styles.inputError]}
                value={vm.name}
                onChangeText={vm.setName}
                onBlur={() => vm.touch("name")}
              />
              {vm.errors.name && (
                <Text style={styles.fieldError}>{vm.errors.name}</Text>
              )}

              {/* EMAIL */}
              <Text style={styles.labelMargin}>
                E-mail<Text style={styles.fieldError}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, vm.errors.email && styles.inputError]}
                autoCapitalize="none"
                value={vm.email}
                onChangeText={vm.setEmail}
                onBlur={() => vm.touch("email")}
              />
              {vm.errors.email && (
                <Text style={styles.fieldError}>{vm.errors.email}</Text>
              )}

              {/* CPF */}
              <Text style={styles.labelMargin}>
                CPF<Text style={styles.fieldError}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, vm.errors.cpf && styles.inputError]}
                keyboardType="numeric"
                placeholder="000.000.000-00"
                value={vm.cpf}
                onChangeText={(text) => vm.setCpf(maskCPF(text))}
                onBlur={() => vm.touch("cpf")}
              />

              <Text style={styles.helpText}>
                Digite apenas números. Ex: 123.456.789-00
              </Text>

              {vm.errors.cpf && (
                <Text style={styles.fieldError}>{vm.errors.cpf}</Text>
              )}
              <Text style={styles.label}>
                Data de nascimento<Text style={styles.fieldError}>*</Text>
              </Text>
              {/* DATA NASCIMENTO */}
              <TextInput
                style={[styles.input, vm.errors.birthDate && styles.inputError]}
                placeholder="dd/mm/aaaa"
                keyboardType="numeric"
                value={vm.birthDate}
                onChangeText={(text) => vm.setBirthDate(maskDate(text))}
                onBlur={() => vm.touch("birthDate")}
              />

              <Text style={styles.helpText}>
                Formato: dia/mês/ano. Ex: 25/12/1995
              </Text>

              {vm.errors.birthDate && (
                <Text style={styles.fieldError}>{vm.errors.birthDate}</Text>
              )}

              <Text style={styles.labelMargin}>
                Gênero<Text style={styles.fieldError}>*</Text>
              </Text>

              <TouchableOpacity
                style={[styles.select, vm.errors.gender && styles.inputError]}
                activeOpacity={0.7}
                onPress={() => setGenderModalVisible(true)}
              >
                <Text
                  style={[
                    styles.selectText,
                    !vm.gender && { color: "#999" }, // placeholder visual
                  ]}
                >
                  {vm.genderLabel || "Selecione"}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#777" />
              </TouchableOpacity>

              {vm.errors.gender && (
                <Text style={styles.fieldError}>{vm.errors.gender}</Text>
              )}

              <GenderSelectModal
                visible={genderModalVisible}
                selected={vm.gender}
                onClose={() => setGenderModalVisible(false)}
                onSelect={(value) => {
                  vm.setGender(value);
                  vm.touch("gender");
                }}
              />

              {/* SENHA */}
              <Text style={styles.labelMargin}>
                Senha<Text style={styles.fieldError}>*</Text>
              </Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    vm.errors.password && styles.inputError,
                  ]}
                  secureTextEntry={!showPassword}
                  value={vm.password}
                  onChangeText={vm.setPassword}
                  onBlur={() => vm.touch("password")}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <View style={styles.iconEye}>
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={22}
                      color="#777"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {vm.errors.password && (
                <Text style={styles.fieldError}>{vm.errors.password}</Text>
              )}

              {/* CONFIRMAR SENHA */}
              <Text style={styles.labelMargin}>
                Confirmar senha<Text style={styles.fieldError}>*</Text>
              </Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    vm.errors.confirmPassword && styles.inputError,
                  ]}
                  secureTextEntry={!showConfirm}
                  value={vm.confirmPassword}
                  onChangeText={vm.setConfirmPassword}
                  onBlur={() => vm.touch("confirmPassword")}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                  <View style={styles.iconEye}>
                    <Ionicons
                      name={showConfirm ? "eye-off" : "eye"}
                      size={22}
                      color="#777"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {vm.errors.confirmPassword && (
                <Text style={styles.fieldError}>
                  {vm.errors.confirmPassword}
                </Text>
              )}
            </View>
          </ScrollView>

          {/* =======================
           * FOOTER FIXO
           * ======================= */}
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
