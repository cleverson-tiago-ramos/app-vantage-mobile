import { useLoginViewModel } from "@/src/viewmodels/useLoginViewModel";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login, loading, error } = useLoginViewModel();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const ok = await login(identifier, password);
    if (ok) {
      //router.replace("/(tabs)/home");
    }
  }

  return (
    <View style={{ padding: 24 }}>
      <Text>Login</Text>

      <TextInput
        placeholder="Email ou CPF"
        value={identifier}
        onChangeText={setIdentifier}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
      />
    </View>
  );
}
