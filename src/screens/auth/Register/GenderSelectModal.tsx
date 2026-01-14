import { colors } from "@/src/components/theme/colors";
import { Gender } from "@/src/domain/types/Gender";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface Props {
  visible: boolean;
  selected: Gender | null;
  onSelect: (value: Gender) => void;
  onClose: () => void;
}

export function GenderSelectModal({
  visible,
  selected,
  onSelect,
  onClose,
}: Props) {
  const options: {
    label: string;
    value: Gender;
    icon: string;
  }[] = [
    { label: "Masculino", value: "male", icon: "male" },
    { label: "Feminino", value: "female", icon: "female" },
    { label: "Outro", value: "other", icon: "transgender" },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose} />

      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecione seu gênero</Text>

        {options.map((item) => {
          const active = selected === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              style={[styles.modalOption, active && styles.modalOptionActive]}
              onPress={() => {
                onSelect(item.value);
                onClose();
              }}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={active ? colors.primary : "#444"}
              />
              <Text
                style={[
                  styles.modalOptionText,
                  active && styles.modalOptionTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Modal>
  );
}
