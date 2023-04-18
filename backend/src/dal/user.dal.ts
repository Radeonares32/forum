//? Repository
import { UserRepository } from "../repository/user.repository";
//? Entity
import { IUser } from "../entity/IUser";

//? Models
import { User } from "../model/User";

//? DataBase
import { neo4j } from "../db/db";

export class UserDal implements UserRepository {
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
    date: string,
    gender: string,
    password: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await User?.create({
          nickname,
          email,
          date,
          gender,
          password,
        });
        resolve({ message: "Success created" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async find(email: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const user: any = await neo4j()?.cypher(
          "match (n1:user {email:$email}) return n1.id,n1.nickname,n1.email,n1.date,n1.gender,n1.password",
          { email }
        ).catch(err=>console.log(err));
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
        const user: any = await neo4j()?.cypher("match (u:user) return u", {}).catch(err=>console.log(err));
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
    date: string,
    gender: string,
    password: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await neo4j()
          ?.writeCypher(
            "match (u:user {id:$id}) set u.nickname=$nickname,u.email=$email,u.date=$date,u.gender=$gender,u.password=$password return u",
            {
              id,
              nickname,
              email,
              date,
              gender,
              password,
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
          "match (n:user {id:$id})-[follow:FOLLOW]->(n1:user) return n1.id,n1.nickname,n1.email,n1.date,n1.gender,n1.password",
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
          "match (n:user {id:$id})-[followers:FOLLOWERS]->(n1:user) return  n1.id,n1.nickname,n1.email,n1.date,n1.gender,n1.password",
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
