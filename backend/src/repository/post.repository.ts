import { IPost } from "../entity/IPost";
export interface PostRepository {
  create(title: string, description: string): Promise<{ message: string }>;
  find(id: string): Promise<IPost>;
  findAll(): Promise<IPost[]>;
  update(
    id: string,
    title: string,
    description: string
  ): Promise<{ message: string }>;
  delete(id: string): Promise<{ message: string }>;
}
