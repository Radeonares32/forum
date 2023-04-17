import { IUser } from "../entity/IUser";
export interface UserRepository {
  create(
    nickname: string,
    email: string,
    date: string,
    gender: string,
    password: string
  ): Promise<{ message: string }>;
  find(id: string): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  update(
    id: string,
    nickname: string,
    email: string,
    date: string,
    gender: string,
    password: string
  ): Promise<{ message: string }>;
  delete(id: string): Promise<{ message: string }>;
}
