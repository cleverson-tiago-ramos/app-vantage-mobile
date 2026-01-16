export interface UserPayload {
  name: string;
  email: string;
  cpf: string;
  password: string;
  birth_date: string;
  gender: string;
}

export interface IUser {
  execute(payload: UserPayload): Promise<any>;
}
