import { User } from "./user.types";

export type ApiLoginResponseType = {
  token: string;
};

export type LoginResponseType = ApiLoginResponseType & {
  expiresAt: number;
}

export type RegisterUserResponseType = {
  account_id: number;
  email: string;
  user_id: number;
};

export type AuthResponseType = {
  sessionId: string;
  user: User;
  expiresAt: number;
};
