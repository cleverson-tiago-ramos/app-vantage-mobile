import { apiClient } from "@/src/api/apiClient";
import { IUser, UserPayload } from "@/src/domain/users/IUser";

export class UserRepository implements IUser {
  async execute(payload: UserPayload) {
    const { data } = await apiClient.post("/mobile/v1/auth/register", payload);

    return data;
  }
}
