import {
  LoginResponseType,
  RegisterUserResponseType,
} from "@/types/auth.types";
import authAPI from "./auth.api";
import { User } from "@/types/user.types";

export default class AuthService {
  async login(email: string, password: string): Promise<LoginResponseType> {
    const token = await authAPI.login(email, password);
    if (token) {
      localStorage.setItem("token", token.token);
    }
    return token;
  }

  async register({
    dni,
    email,
    firstname,
    lastname,
    password,
    phone,
  }: User): Promise<RegisterUserResponseType> {
    return await authAPI.register({
      dni,
      email,
      firstname,
      lastname,
      password,
      phone,
    });
  }

  async logout(): Promise<void> {
    await authAPI.logout();
  }
}
