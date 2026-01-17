// src/components/form/FormInput/FormInput.tsx
import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";

interface Props extends TextInputProps {
  label: string;
  error?: string | null;
  marginTop?: boolean;
}

export function FormInput({
  label,
  error,
  marginTop,
  style,
  ...inputProps
}: Props) {
  return (
    <View style={marginTop && styles.marginTop}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...inputProps}
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#999"
      />

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
