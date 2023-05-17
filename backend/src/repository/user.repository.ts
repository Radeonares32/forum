import { IUser } from "../entity/IUser";
export interface UserRepository {
  create(
    nickname: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    note: string
  ): Promise<{ message: string }>;
  find(email: string): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  update(
    id: string,
    nickname: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    note: string
  ): Promise<{ message: string }>;
  delete(id: string): Promise<{ message: string }>;
}
