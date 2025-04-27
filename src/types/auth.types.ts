export type LoginResponseType = {
  token: string;
};

export type RegisterUserParamsType = {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
};

export type RegisterUserResponseType = {
  account_id: number;
  email: string;
  user_id: number;
};
