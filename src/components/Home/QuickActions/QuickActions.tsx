// src/components/Home/QuickActions/QuickActions.tsx
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
const actions = [
  { label: "Meus benefícios", icon: "⭐" },
  { label: "Histórico de notas", icon: "🧾" },
  { label: "Estacionamento", icon: "🚗" },
  { label: "Cinema", icon: "🎬" },
];

export function QuickActions() {
  return (
    <View style={styles.container}>
      {actions.map((item) => (
        <TouchableOpacity key={item.label} style={styles.card}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
