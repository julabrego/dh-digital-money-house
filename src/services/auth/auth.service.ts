import { Account } from "@/types/accout.types";
import {
  LoginResponseType,
  RegisterUserResponseType,
} from "@/types/auth.types";
import { User } from "@/types/user.types";
import authAPI from "./auth.api";

class AuthService {
  async authenticate(
    email: string,
    password: string
  ): Promise<LoginResponseType> {
    const loginResponse = await authAPI.authenticate(email, password);
    const expiresAt = await this.getSessionExpirationtime();

    return {
      token: loginResponse.token,
      expiresAt,
    };
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

  async update(
    userId: string,
    { dni, email, firstname, lastname, password, phone }: Partial<User>,
    accessToken: string
  ): Promise<User> {
    return await authAPI.update(
      userId,
      {
        dni,
        email,
        firstname,
        lastname,
        password,
        phone,
      },
      accessToken
    );
  }

  async getSessionExpirationtime() {
    const now = new Date();
    return new Date(now.getTime() + 60 * 6000 * 1000).getTime();
  }
}

const authService = new AuthService();

export default authService;
