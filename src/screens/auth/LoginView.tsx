// src/screens/auth/LoginView.tsx
import { Button, Text, TextInput, View } from "react-native";
import { useLoginViewModel } from "./LoginViewModel";

export function LoginView() {
  const vm = useLoginViewModel();

  return (
    <View style={{ padding: 24 }}>
      <Text>Login</Text>

      <TextInput
        placeholder="Email ou CPF"
        value={vm.identifier}
        onChangeText={vm.setIdentifier}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={vm.password}
        onChangeText={vm.setPassword}
      />

      {vm.error && <Text style={{ color: "red" }}>{vm.error}</Text>}

      <Button
        title={vm.loading ? "Entrando..." : "Entrar"}
        onPress={vm.submit}
      />
    </View>
  );
}
