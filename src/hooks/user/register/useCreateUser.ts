import { createUser } from "@/src/services/user/CreateUser";
import { isAxiosError } from "axios";

export interface CreateUserInput {
  name: string;
  email: string;
  cpf: string;
  password: string;
  birthDate: string;
  gender: "male" | "female" | "other";
}

function normalizeCPF(cpf: string) {
  return cpf.replace(/\D/g, "");
}

export class CreateUserError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

export function useCreateUser() {
  async function execute(input: CreateUserInput) {
    try {
      return await createUser({
        name: input.name,
        email: input.email,
        cpf: normalizeCPF(input.cpf),
        password: input.password,
        birth_date: input.birthDate,
        gender: input.gender,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          (error.response?.data as any)?.message || "Erro ao criar conta";

        if (status === 409) {
          throw new CreateUserError(message, 409);
        }

        if (status === 422) {
          throw new CreateUserError(message, 422);
        }

        if (status && status >= 500) {
          throw new CreateUserError(
            "Erro no servidor. Tente novamente mais tarde.",
            status
          );
        }
      }

      throw new CreateUserError("Erro inesperado ao criar conta");
    }
  }

  return { execute };
}
