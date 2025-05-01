import { User } from "@/types/user.types";
import userAPI from "./user.api";

class UserService {
  getUsers = async (): Promise<User[]> => {
    return await userAPI.getUsers();
  };
  getUser = async (id: string): Promise<User> => {
    return await userAPI.getUser(id);
  };
}

const userService = new UserService();

export default userService;
