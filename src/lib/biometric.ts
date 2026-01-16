import * as LocalAuthentication from "expo-local-authentication";

export async function authenticateWithBiometrics(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return true;

  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  if (!isEnrolled) return true;

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Confirme sua identidade",
    fallbackLabel: "Usar senha",
    cancelLabel: "Cancelar",
    disableDeviceFallback: false,
  });

  return result.success;
}
