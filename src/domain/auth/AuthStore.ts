import { User } from "@/src/domain/models/users/User";

export interface AuthStore {
  // dados
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  // estados
  isBootstrapping: boolean;
  isBiometricChecking: boolean;
  isBiometricVerified: boolean;
  requireBiometric: boolean;

  // sessão
  setSession: (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;

  updateTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  restoreSession: () => Promise<void>;
  clearSession: () => Promise<void>;

  // bootstrap
  finishBootstrap: () => void;

  // biometria
  startBiometricCheck: () => void;
  verifyBiometric: () => Promise<void>;
  failBiometric: () => Promise<void>;
}
