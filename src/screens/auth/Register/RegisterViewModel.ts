// src/screens/auth/Register/RegisterViewModel.ts
import { useToast } from "@/src/components/toast/ToastProvider";
import {
  CreateUserError,
  useCreateUser,
} from "@/src/hooks/user/register/useCreateUser";
import { isValidCPF } from "@/src/utils/masks";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useRegisterViewModel() {
  const router = useRouter();
  const { execute } = useCreateUser();
  const { showToast } = useToast();

  /* ======================
   * STATE
   * ====================== */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(
    null
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /* ======================
   * UX HELPERS
   * ====================== */
  function touch(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  const genderLabel =
    gender === "male"
      ? "Masculino"
      : gender === "female"
      ? "Feminino"
      : gender === "other"
      ? "Outro"
      : "";

  /* ======================
   * VALIDATIONS
   * ====================== */
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isCpfValid = isValidCPF(cpf);

  const passwordRules = {
    min: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordRules).every(Boolean);

  const isFormValid =
    name.trim().length > 0 &&
    isEmailValid &&
    isCpfValid &&
    birthDate.length === 10 &&
    gender !== null &&
    isPasswordStrong &&
    password === confirmPassword;

  /* ======================
   * FIELD ERRORS
   * ====================== */
  const errors = {
    name: touched.name && !name ? "Informe seu nome completo" : undefined,
    email: touched.email && !isEmailValid ? "E-mail inválido" : undefined,
    cpf: touched.cpf && !isCpfValid ? "CPF inválido" : undefined,
    birthDate:
      touched.birthDate && birthDate.length !== 10
        ? "Data inválida"
        : undefined,
    gender: touched.gender && !gender ? "Selecione um gênero" : undefined,
    password:
      touched.password && !isPasswordStrong
        ? "Senha fraca. Use letras, número e símbolo."
        : undefined,
    confirmPassword:
      touched.confirmPassword && password !== confirmPassword
        ? "As senhas não conferem"
        : undefined,
  };

  /* ======================
   * SUBMIT
   * ====================== */
  async function submit() {
    if (!isFormValid) {
      setTouched({
        name: true,
        email: true,
        cpf: true,
        birthDate: true,
        gender: true,
        password: true,
        confirmPassword: true,
      });

      showToast("Preencha todos os campos obrigatórios corretamente", "error");
      return;
    }

    try {
      setLoading(true);

      await execute({
        name,
        email,
        cpf,
        password,
        birthDate,
        gender: gender!,
      });

      showToast("Conta criada com sucesso. Faça login.", "success");

      // 👉 cadastro NÃO loga automaticamente
      router.replace("/(auth)/login");
    } catch (error) {
      if (error instanceof CreateUserError) {
        showToast(error.message, "error");
      } else {
        showToast("Erro inesperado ao criar conta", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  /* ======================
   * PUBLIC API
   * ====================== */
  return {
    name,
    email,
    cpf,
    birthDate,
    gender,
    genderLabel,
    password,
    confirmPassword,

    loading,
    errors,
    isFormValid,

    setName,
    setEmail,
    setCpf,
    setBirthDate,
    setGender,
    setPassword,
    setConfirmPassword,

    submit,
    touch,
  };
}
