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
    error,
    isFormValid,
    setName,
    setEmail,
    setCpf,
    setBirthDate,
    setPassword,
    setConfirmPassword,
    toggleGender,
    submit,
  };
}
