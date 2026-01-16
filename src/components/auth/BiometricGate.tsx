// src/components/auth/BiometricGate.tsx
import { authenticateWithBiometrics } from "@/src/lib/biometric";
import { useAuthStore } from "@/src/store/auth.store";
import { useEffect } from "react";

export function BiometricGate() {
  useEffect(() => {
    async function runBiometric() {
      const store = useAuthStore.getState();

      if (!store.requireBiometric || store.isBiometricVerified) return;

      store.startBiometricCheck();

      const success = await authenticateWithBiometrics();

      if (success) {
        store.verifyBiometric();
      } else {
        store.failBiometric();
      }
    }

    runBiometric();
  }, []);

  return null;
}
