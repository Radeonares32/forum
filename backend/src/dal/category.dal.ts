import { v4 as uuid } from "uuid";

//? Repository
import { CategoryRepository } from "../repository/category.repository";
//? Entity
import { ICategory } from "../entity/ICategory";

//? DataBase
import { neo4j } from "../db/db";

export class CategoryDal implements CategoryRepository {
  async delete(id: string, userId: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()?.writeCypher(
          "match(u:{id:$userId}) match (c:category {id:$id})-[categoryRel:categoryRel]->(u) detach delete c",
          {
            id,
            userId,
          }
        );
        return resolve({ message: "Success deleted" });
      } catch (err) {
        return reject({ message: "Error " + err });
      }
    });
  }
  async create(title: string, userId: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$userId}) create (c:category {id:$id,title:$title}) create(u)-[categoryRel:categoryRel]->(c)",
            {
              title,
              userId,
              id: uuid(),
            }
          )
          .catch((err) => console.log(err));
        resolve({ message: "Success created" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async find(id: string): Promise<ICategory> {
    return new Promise(async (resolve, reject) => {
      try {
        const category: any = await neo4j()
          ?.cypher("match (c:category {id:$id}) return c.id,c.title", { id })
          .catch((err) => console.log(err));
        const rCategory = category.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res;
          });
        });
        resolve(rCategory as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async findAll(): Promise<ICategory[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const category: any = await neo4j()
          ?.cypher("match (c:category) return c", {})
          .catch((err) => console.log(err));
        const rCategory = category.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rCategory as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async update(id: string, title: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match (c:category {id:$id}) set c.title=$title return c",
            {
              id,
              title,
            }
          )
          .catch((err: any) => console.log(err));
        resolve({ message: "Success update" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
}
