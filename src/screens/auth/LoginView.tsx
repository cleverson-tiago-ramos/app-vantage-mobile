import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLoginViewModel } from "./LoginViewModel";
import { styles } from "./styles";

export function LoginView() {
  const vm = useLoginViewModel();

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <TouchableOpacity style={styles.back}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("@/assets/images/logo_padrao.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          value={vm.identifier}
          onChangeText={vm.setIdentifier}
          autoCapitalize="none"
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Senha</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={vm.password}
            onChangeText={vm.setPassword}
          />
          <Text style={styles.eye}>👁</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        {vm.error && <Text style={styles.error}>{vm.error}</Text>}

        <TouchableOpacity style={styles.button} onPress={vm.submit}>
          <Text style={styles.buttonText}>
            {vm.loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.register}>
          Primeiro acesso? <Text style={styles.registerLink}>Cadastre-se</Text>
        </Text>
      </View>
    </View>
  );
}
