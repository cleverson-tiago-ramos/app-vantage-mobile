// src/services/auth.service.ts
import { apiClient } from "@/src/api/apiClient";
import { User } from "@/src/models/users/User";

export async function loginService(
  identifier: string,
  password: string
): Promise<{ user: User; tokens: { accessToken: string } }> {
  const { data } = await apiClient.post("/auth/login", {
    identifier,
    password,
  });

  return data;
}
