import { ICategory } from "../entity/ICategory";
export interface CategoryRepository {
  create(title: string, mainRel: string): Promise<{ message: string }>;
  mainCreate(title: string): Promise<{ message: string }>
  findMain(id: string): Promise<ICategory>
  findAllMain(): Promise<ICategory[]>
  getCategoryRel(mainRel: string): Promise<ICategory[]>
  find(id: string): Promise<ICategory>;
  findAll(): Promise<ICategory[]>;
  update(
    id: string,
    title: string,
    userId: string
  ): Promise<{ message: string }>;
  delete(id: string, userId: string): Promise<{ message: string }>;
}
