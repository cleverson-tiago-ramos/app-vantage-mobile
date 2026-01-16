// src/application/usecases/users/RegisterUserUseCase.ts
import { IUser, UserPayload } from "@/src/domain/repositories/users/IUser";

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUser) {}

  async execute(payload: UserPayload) {
    if (!payload.email || !payload.password) {
      throw new Error("Dados inválidos para cadastro");
    }

    return this.userRepository.execute(payload);
  }
}
