// src/components/form/PasswordInput/PasswordInput.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

interface Props extends TextInputProps {
  label: string;
  error?: string | null;
  marginTop?: boolean;
}

export function PasswordInput({
  label,
  error,
  marginTop,
  style,
  ...inputProps
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={marginTop && styles.marginTop}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.wrapper, error && styles.wrapperError]}>
        <TextInput
          {...inputProps}
          secureTextEntry={!visible}
          style={[styles.input, style]}
          placeholderTextColor="#999"
        />

        <TouchableOpacity onPress={() => setVisible(!visible)} hitSlop={10}>
          <Ionicons name={visible ? "eye-off" : "eye"} size={22} color="#777" />
        </TouchableOpacity>
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
