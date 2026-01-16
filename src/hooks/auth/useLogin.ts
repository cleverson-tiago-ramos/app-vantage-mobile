import { useToast } from "@/src/components/toast/ToastProvider";
import { useAuthStore } from "@/src/infrastructure/repositories/auth/auth.store";
import { auth } from "@/src/lib/firebase";
import { loginService } from "@/src/services/auth.service";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(identifier: string, password: string) {
    console.log("[LOGIN] início do login");
    setError(null);
    setLoading(true);

    try {
      // 1️⃣ Firebase valida identidade
      console.log("[LOGIN] Firebase signInWithEmailAndPassword");
      await signInWithEmailAndPassword(auth, identifier, password);
      console.log("[LOGIN] Firebase OK");

      // 2️⃣ Backend cria sessão (JWT)
      console.log("[LOGIN] Chamando backend /auth/login");
      const result = await loginService(identifier, password);

      console.log("[LOGIN] Backend retornou tokens:", {
        accessToken: result.tokens.accessToken,
        refreshToken: result.tokens.refreshToken,
      });

      // 3️⃣ Persistência
      console.log("[LOGIN] Salvando sessão no SecureStore");
      await setSession(
        result.user,
        result.tokens.accessToken,
        result.tokens.refreshToken
      );
      console.log("[LOGIN] Sessão salva com sucesso");

      showToast("Login realizado com sucesso!", "success");
    } catch (err) {
      console.log("[LOGIN] Erro no login:", err);
      setError("Credenciais inválidas");
      showToast("Email/CPF ou senha incorretos", "error");
    } finally {
      setLoading(false);
      console.log("[LOGIN] Fim do login");
    }
  }

  return { login, loading, error };
}
