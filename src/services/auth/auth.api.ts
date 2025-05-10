import { Account } from "@/types/accout.types";
import {
  ApiLoginResponseType,
  RegisterUserResponseType,
} from "@/types/auth.types";
import { User } from "@/types/user.types";
import httpInternalAPI from "../common/http.internal.service";
import httpExternalAPI from "../common/http.external.service";

class AuthAPI {

  login = async (email: string, password: string): Promise<ApiLoginResponseType> =>
    httpInternalAPI.httpPost(`/auth/login`, { email, password });
  
  authenticate = async (email: string, password: string): Promise<ApiLoginResponseType> =>
    httpExternalAPI.httpPostPublic(`/login`, { email, password });

  register = async ({
    dni,
    email,
    firstname,
    lastname,
    password,
    phone,
  }: User): Promise<RegisterUserResponseType> =>
    httpInternalAPI.httpPostPublic(`/users`, {
      dni,
      email,
      firstname,
      lastname,
      password,
      phone,
    });

  logout = async (): Promise<ApiLoginResponseType> =>
    httpInternalAPI.httpGetPublic(`/auth/logout`);

  getAccountInfo = async (token: string): Promise<Account> =>
    httpExternalAPI.httpGet(`/api/account`, undefined, token);
}

const authAPI = new AuthAPI();

export default authAPI;
