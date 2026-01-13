import { apiClient } from "@/src/api/apiClient";
import { User } from "@/src/domain/models/users/User";

export async function loginService(
  identifier: string,
  password: string
): Promise<{ user: User; tokens: { accessToken: string } }> {
  const { data } = await apiClient.post("/mobile/v1/auth/login", {
    identifier,
    password,
  });

  return data;
}
