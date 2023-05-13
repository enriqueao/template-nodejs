import { User } from "./user";

export interface UserRepository {
  create(data: User): Promise<void>;
  getUserByUserName(userName: string): Promise<any>;
}
