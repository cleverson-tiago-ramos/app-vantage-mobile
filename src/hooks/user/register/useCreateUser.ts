import { createUser } from "@/src/services/user/CreateUser";
import axios from "axios";

export interface CreateUserInput {
  name: string;
  email: string;
  cpf: string;
  password: string;
  birthDate: string;
  gender: "male" | "female" | "other";
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
        cpf: input.cpf,
        password: input.password,
        birth_date: input.birthDate,
        gender: input.gender,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          throw new CreateUserError("CPF ou e-mail já cadastrado", 409);
        }

        if (status === 422) {
          throw new CreateUserError(
            "Dados inválidos. Verifique os campos.",
            422
          );
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
