import { colors } from "@/src/components/theme/colors";
import React, { createContext, useContext, useState } from "react";
import { Animated, Text } from "react-native";
import { styles } from "./styles";
type ToastType = "success" | "error";

interface Toast {
  message: string;
  type: ToastType;
}

interface ToastContextData {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextData | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const opacity = new Animated.Value(0);

  function showToast(message: string, type: ToastType) {
    setToast({ message, type });

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setToast(null));
    }, 2500);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={[
            styles.toast,
            {
              backgroundColor:
                toast.type === "success" ? colors.success : colors.error,
              opacity,
            },
          ]}
        >
          <Text style={styles.text}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
