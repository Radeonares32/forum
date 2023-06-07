import { IUser } from "../entity/IUser";
import { IComplain } from "../entity/IComplain";
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
  adminUser(email: string, password: string): Promise<{ message: string }>;
  postComplain(
    userId: string,
    title: string,
    description: string
  ): Promise<{ message: string }>;
  getComplain(): Promise<IComplain[]>;
}
