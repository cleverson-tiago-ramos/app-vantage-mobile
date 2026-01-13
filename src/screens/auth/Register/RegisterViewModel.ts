import { createUser } from "@/src/services/auth.service";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useRegisterViewModel() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | null>(
    null
  );
  const [showGender, setShowGender] = useState(false);
  function toggleGender() {
    // por enquanto só alterna (pronto para modal depois)
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  async function submit() {
    setError(null);

    if (!name || !email || !cpf || !password) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    try {
      setLoading(true);

      await createUser({
        name,
        email,
        cpf,
        password,
      });

      router.replace("/(auth)/login");
    } catch (e: any) {
      setError(e?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }
  function touch(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isCpfValid = cpf.replace(/\D/g, "").length === 11;

  const isFormValid =
    name.trim().length > 0 &&
    isEmailValid &&
    isCpfValid &&
    birthDate.trim().length === 10 &&
    gender !== null &&
    password.length >= 6 &&
    password === confirmPassword;

  const errors = {
    name:
      touched.name && name.trim().length === 0
        ? "Informe seu nome completo"
        : undefined,

    email: touched.email && !isEmailValid ? "E-mail inválido" : undefined,

    cpf: touched.cpf && !isCpfValid ? "CPF inválido" : undefined,

    birthDate:
      touched.birthDate && birthDate.trim().length !== 10
        ? "Data inválida"
        : undefined,

    gender: touched.gender && !gender ? "Selecione um gênero" : undefined,

    password:
      touched.password && password.length < 6
        ? "Senha deve ter ao menos 6 caracteres"
        : undefined,

    confirmPassword:
      touched.confirmPassword && password !== confirmPassword
        ? "As senhas não conferem"
        : undefined,
  };

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
