// src/screens/auth/Register/RegisterViewModel.ts
import { useCreateUser } from "@/src/hooks/user/register/useCreateUser";
import { isValidCPF } from "@/src/utils/masks";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useRegisterViewModel() {
  const router = useRouter();
  const { execute } = useCreateUser();

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

  function toggleGender() {
    if (!gender) setGender("male");
    else if (gender === "male") setGender("female");
    else if (gender === "female") setGender("other");
    else setGender(null);
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
    if (!isFormValid) return;

    try {
      setLoading(true);

      await execute({
        name,
        email,
        cpf,
        password,
        birthDate,
        gender: gender!, // seguro aqui
      });

      // 🔜 aqui entra login automático ou toast
      router.replace("/(auth)/login");
    } finally {
      setLoading(false);
    }
  }

  /* ======================
   * PUBLIC API
   * ====================== */
  return {
    // values
    name,
    email,
    cpf,
    birthDate,
    gender,
    genderLabel,
    password,
    confirmPassword,

    // status
    loading,
    errors,
    isFormValid,

    // setters
    setName,
    setEmail,
    setCpf,
    setBirthDate,
    setPassword,
    setConfirmPassword,

    // actions
    toggleGender,
    submit,
    touch,
  };
}
