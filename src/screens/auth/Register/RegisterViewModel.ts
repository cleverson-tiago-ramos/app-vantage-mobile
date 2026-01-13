import { createUser } from "@/src/services/auth.service";
import { useRouter } from "expo-router";
import { useState } from "react";

export function useRegisterViewModel() {
  const router = useRouter();

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

  return {
    name,
    email,
    cpf,
    password,
    confirmPassword,
    loading,
    error,
    setName,
    setEmail,
    setCpf,
    setPassword,
    setConfirmPassword,
    submit,
  };
}
