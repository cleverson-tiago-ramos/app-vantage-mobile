// src/components/auth/BiometricGate.tsx
// src/components/auth/BiometricGate.tsx
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect } from "react";

export function BiometricGate() {
  const { startBiometricCheck, verifyBiometric, failBiometric } =
    useAuthStore();

  useEffect(() => {
    let mounted = true;

    async function run() {
      startBiometricCheck();

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirme sua identidade",
      });

      if (!mounted) return;

      if (result.success) {
        await verifyBiometric();
      } else {
        await failBiometric();
      }
    }

    run();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
