import { ICategory } from "../entity/ICategory";
export interface CategoryRepository {
  create(title: string, userId: string): Promise<{ message: string }>;
  find(id: string): Promise<ICategory>;
  findAll(): Promise<ICategory[]>;
  update(
    id: string,
    title: string,
    userId: string
  ): Promise<{ message: string }>;
  delete(id: string, userId: string): Promise<{ message: string }>;
}
