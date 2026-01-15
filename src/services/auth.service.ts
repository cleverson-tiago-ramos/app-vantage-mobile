import { apiClient } from "@/src/api/apiClient";
import { AuthResponseDTO } from "@/src/application/dtos/auth/AuthResponseDTO";

export async function loginService(
  identifier: string,
  password: string
): Promise<AuthResponseDTO> {
  const { data } = await apiClient.post("/mobile/v1/auth/login", {
    identifier,
    password,
  });

  return data;
}
