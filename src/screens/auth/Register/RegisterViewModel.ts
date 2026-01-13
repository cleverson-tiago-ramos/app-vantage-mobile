import { createUser } from "@/src/services/auth.service";
import { isValidCPF } from "@/src/utils/masks";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useRegisterViewModel() {
  const router = useRouter();

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

  async function submit() {
    if (!isFormValid) return;

    setLoading(true);
    await createUser({
      name,
      email,
      cpf,
      password,
    });

    setLoading(false);
    router.replace("/(auth)/login");
  }

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
    setPassword,
    setConfirmPassword,
    toggleGender,
    submit,
    touch,
  };
}
