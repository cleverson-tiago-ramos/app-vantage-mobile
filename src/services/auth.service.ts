import { apiClient } from "@/src/api/apiClient";
import { User } from "@/src/models/User";

interface MeResponse {
  user: User;
}

interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export async function loginService(
  identifier: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", {
    identifier,
    password,
  });

  return data;
}
export async function meService(): Promise<User> {
  const { data } = await apiClient.get<MeResponse>("/auth/me");
  return data.user;
}
