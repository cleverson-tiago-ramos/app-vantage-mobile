import { apiClient } from "@/src/api/apiClient";

export interface CreateUserPayload {
  name: string;
  email: string;
  cpf: string;
  password: string;
  birth_date: string;
  gender: string;
}

export async function createUser(payload: CreateUserPayload) {
  const { data } = await apiClient.post("/mobile/v1/auth/register", payload);

  return data;
}
