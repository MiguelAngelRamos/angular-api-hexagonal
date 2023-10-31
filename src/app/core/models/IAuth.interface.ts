export interface IAuth {
  id?: number;
  name?: string;
  username?: string;
  email: string;
  password: string;
  token?: string;
}