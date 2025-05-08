import { Account } from "@/types/accout.types";
import {
  LoginResponseType,
  RegisterUserResponseType,
} from "@/types/auth.types";
import { User } from "@/types/user.types";
import authAPI from "./auth.api";

export default class AuthService {
  async login(email: string, password: string): Promise<LoginResponseType> {
    const loginResponse = await authAPI.login(email, password);
    if (loginResponse) {
      localStorage.setItem("token", loginResponse.token);
    }
    return loginResponse;
  }

  async getAccountInfo(token: string): Promise<Account> {
    return await authAPI.getAccountInfo(token);
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
