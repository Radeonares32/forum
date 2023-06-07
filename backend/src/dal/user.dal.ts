import { v4 as uuid } from "uuid";

//? Repository
import { UserRepository } from "../repository/user.repository";
//? Entity
import { IUser } from "../entity/IUser";

//? Models
import { User } from "../model/User";

//? DataBase
import { neo4j } from "../db/db";
import { IComplain } from "../entity/IComplain";

export class UserDal implements UserRepository {
  adminUser(email: string, password: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "create(:admin{id:$id,email:$email,$password:$password})",
            {
              id: uuid(),
              email,
              password,
            }
          )
          .catch((err) => console.log(err));
        resolve({ message: "Success addmin created" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  postComplain(
    userId: string,
    title: string,
    description: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$userId}) create(c:complain{id:$id,title:$title,description:$description}) create(u)-[complainUserRel:complainUserRel]->(c) create(c)-[userComplainRel:userComplainRel]->(u)",
            {
              id: uuid(),
              title,
              description,
              userId,
            }
          )
          .catch((err) => console.log(err));
        resolve({ message: "Success complain" });
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  getComplain(): Promise<IComplain[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()?.writeCypher(
          "match (u:user) match(c:complain) match(u)-[complainUserRel:complainUserRel]->(c) return u,c",
          {}
        );
        const rLike = user?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rLike as IComplain[]);
      } catch (err) {
        reject({ message: err });
      }
    });
  }
  async delete(id: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()?.writeCypher("match (u:user {id:$id}) detach delete u", {
          id: id,
        });
        return resolve({ message: "Success deleted" });
      } catch (err) {
        return reject({ message: "Error " + err });
      }
    });
  }
  async create(
    nickname: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    note: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "create (u:user {id:$id,nickname:$nickname,email:$email,password:$password,image:$image})",
            {
              id: uuid(),
              nickname,
              email,
              password,
              image,
            }
          )
          .catch((err) => console.log(err));
        resolve({ message: "Success created" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async find(email: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await neo4j()
          ?.cypher("match (n1:user {email:$email}) return n1", { email })
          .catch((err) => console.log(err));
        const rUser = user.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async findAll(): Promise<IUser[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await neo4j()
          ?.cypher("match (u:user) return u", {})
          .catch((err) => console.log(err));
        const rUser = user.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }

  async update(
    id: string,
    nickname: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    note: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()
          ?.writeCypher(
            "match (u:user {id:$id}) set u.nickname=$nickname,u.email=$email,u.password=$password,u.bio=$bio,u.image=$image,u.note=$notr return u",
            {
              id,
              nickname,
              email,
              password,
              bio,
              image,
              note,
            }
          )
          .catch((err: any) => console.log(err));
        resolve({ message: "Success update" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async follow(
    follow: string,
    followers: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()?.writeCypher(
          "match (f1:user {id:$follow}) match(f2:user {id:$followers}) create(f1)-[follow:FOLLOW]->(f2) create (f2)-[followers:FOLLOWERS]->(f1) ",
          { follow, followers }
        );

        resolve({ message: "Success following" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async unFollow(
    follow: string,
    followers: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()?.writeCypher(
          "match(f1:user {id:$follow})-[follow:FOLLOW]->(f2:user {id:$followers}) match(f2:user {id:$followers})-[followers:FOLLOWERS]->(f1:user {id:$follow}) delete followers,follow",
          { follow, followers }
        );
        resolve({ message: "Success un follow" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async getFollow(id: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()?.cypher(
          "match (n:user {id:$id})-[follow:FOLLOW]->(n1:user) return n1",
          { id: id }
        );
        const rUser = user?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async getFollowers(id: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()?.cypher(
          "match (n:user {id:$id})-[followers:FOLLOWERS]->(n1:user) return  n1",
          { id: id }
        );
        const rUser = user?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async getUserEmail(email: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()?.cypher(
          "match (u:user {email:$email}) return u.email,u.password",
          { email }
        );
        const rUser = user?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async getSign(email: string, password: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()?.cypher(
          "match (u:user {email:$email,password:$password}) return u",
          { email, password }
        );
        const rUser = user?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rUser as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
}
