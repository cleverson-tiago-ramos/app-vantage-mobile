import { User } from "@/src/domain/models/users/User";

export interface AuthTokensDTO {
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  expiresIn: number;
}

export interface AuthResponseDTO {
  user: User;
  tokens: AuthTokensDTO;
}
