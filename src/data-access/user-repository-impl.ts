import { IUser, IUserRepository } from "../domain";

export class UserRepositoryImpl implements IUserRepository {
  create(data: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateById(id: number, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  find(data: any): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: number): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}