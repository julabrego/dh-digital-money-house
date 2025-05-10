import { User } from "@/types/user.types";
import UserAPI from "./user.api";

 class UserService {
  private _userToken: string | undefined;
  private _userApi: UserAPI;

  constructor(userToken?: string) {
    this._userToken = userToken;
    this._userApi = new UserAPI(userToken);
  }

  set userToken(token: string | undefined) {
    this._userToken = token;
    this._userApi = new UserAPI(token);
  }

  getUsers = async (): Promise<User[]> => {
    return await this._userApi.getUsers();
  };
  getUser = async (id: string): Promise<User> => {
    return await this._userApi.getUser(id);
  };
}

const userService = new UserService();

export default userService;