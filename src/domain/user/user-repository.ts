import { IUser } from "./IUser";

export interface IUserRepository {
  create(data: IUser): Promise<IUser>;
  deleteById(id: number): Promise<any>;
  updateById(id: number, data: any): Promise<any>;
  find(data: any): Promise<IUser[]>;
  findOne(id: number): Promise<IUser>;
}