import {v4 as uuid} from 'uuid'

//? Repository
import { PostRepository } from "../repository/post.repository";
//? Entity
import { IPost } from "../entity/IPost";

//? Models
import { Post } from "../model/Post";

//? DataBase
import { neo4j } from "../db/db";

export class PostDal implements PostRepository {
  async delete(id: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()?.writeCypher("match (p:post {id:$id}) detach delete p", {
          id: id,
        });
        return resolve({ message: "Success deleted" });
      } catch (err) {
        return reject({ message: "Error " + err });
      }
    });
  }
  async create(
    title: string,
    description: string,
    userId: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()?.writeCypher(
          "create (p:post {id:$id,title:$title,description:$description}) match(u:user {id:$userId}) create(u)-[postRel:postRel]->(p)",
          {
            title,
            description,
            userId,
            id:uuid()
          }
        );
        resolve({ message: "Success created" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async find(id: string): Promise<IPost> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.cypher(
            "match (p:post {id:$id}) return p.id,p.title,p.description",
            { id }
          )
          .catch((err) => console.log(err));
        const rPost = post.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res;
          });
        });
        resolve(rPost as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async findAll(): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.cypher("match (p:post) return p", {})
          .catch((err) => console.log(err));
        const rPost = post.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rPost as any);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async update(
    id: string,
    title: string,
    description: string,
    userId: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match (p:post {id:$id,userId:$userId}) set p.title=$title,p.description=$description return p",
            {
              id,
              title,
              description,
              userId,
            }
          )
          .catch((err: any) => console.log(err));
        resolve({ message: "Success update" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async comment(
    userId: string,
    postId: string,
    description: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()?.writeCypher("match(u:user {id:$userId}) match(p:post {id:$postId}) create(c:comment {id:$id,description:$description}) create(u)-[commentUserRel:commentUserRel]->(c) create(c)-[commentPostRel:commentPostRel]->(p)", {
          userId,
          postId,
          description,
          id:uuid()
        });

        resolve({ message: "Success Comment" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async subComment(
    userId: string,
    commentId: string,
    description: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()?.writeCypher("match(u:user {id:$userId}) match(c:comment {id:$commentId}) create(c1:comment {id:$id,description:$description}) create(u)-[subCommentUserRel:subCommentUserRel]->(c1) create(c1)-[subCommentCommentRel:subCommentCommentRel]->(c) ", {
          userId,
          commentId,
          description,
          id:uuid()
        });

        resolve({ message: "Success SubComment" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async postLike(userId:string,postId:string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const isLike = await neo4j()?.cypher(
            "match(u:user {id:$userId})-[likeRel:likeRel]->(l:like) match(p:post {id:$postId})<-[likePostRel:likePostRel]-(l)"
        ,{userId,postId})
        /*const like = await neo4j()?.writeCypher(
          "match(u:user {id:$userId}) match(p:post {id:$postId}) create(l:like {id:$id}) create(u)-[likeRel:likeRel]->(l) create(l)-[likePostRel:likePostRel]->(p)",
          { id: uuid() }
        ); */
        const rUser = isLike?.records.map((uss: any) => {
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
 /* async getFollowers(id: string): Promise<{ message: string }> {
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
  */
}
