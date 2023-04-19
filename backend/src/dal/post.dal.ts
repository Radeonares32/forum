import { v4 as uuid } from "uuid";

//? Repository
import { PostRepository } from "../repository/post.repository";
//? Entity
import { IPost } from "../entity/IPost";

//? Models
import { Post } from "../model/Post";

//? DataBase
import { neo4j } from "../db/db";

export class PostDal implements PostRepository {
  async delete(id: string, userId: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()?.writeCypher(
          "match(u:{id:$userId}) match (p:post {id:$id})-[postRel:postRel]->(u) detach delete p",
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
  async create(
    title: string,
    description: string,
    userId: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$userId}) create (p:post {id:$id,title:$title,description:$description}) create(u)-[postRel:postRel]->(p)",
            {
              title,
              description,
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
    description: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match (p:post {id:$id}) set p.title=$title,p.description=$description return p",
            {
              id,
              title,
              description,
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
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$userId}) match(p:post {id:$postId}) create(c:comment {id:$id,description:$description}) create(u)-[commentUserRel:commentUserRel]->(c) create(c)-[commentPostRel:commentPostRel]->(p)",
            {
              userId,
              postId,
              description,
              id: uuid(),
            }
          )
          .catch((err) => console.log(err));

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
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$userId}) match(c:comment {id:$commentId}) create(c1:comment {id:$id,description:$description}) create(u)-[subCommentUserRel:subCommentUserRel]->(c1) create(c1)-[subCommentCommentRel:subCommentCommentRel]->(c) ",
            {
              userId,
              commentId,
              description,
              id: uuid(),
            }
          )
          .catch((err) => console.log(err));

        resolve({ message: "Success SubComment" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async postLike(userId: string, postId: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const isLike = await neo4j()
          ?.cypher(
            "match(u:user {id:$userId})-[likeRel:likeRel]->(l:like) match(p:post {id:$postId})<-[likePostRel:likePostRel]-(l) return l",
            { userId, postId }
          )
          .catch((err) => console.log(err));
        const rLike: any = isLike?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        if (rLike?.length > 0) {
            await neo4j()?.writeCypher("match(l:like {id:$id}) detach delete l",{id:rLike[0][0].id}).catch(err=>console.log(err))
            resolve({ message: "Success unLike" });
        } else {
          await neo4j()
            ?.writeCypher(
              "match(u:user {id:$userId}) match(p:post {id:$postId}) create(l:like {id:$id}) create(u)-[likeRel:likeRel]->(l) create(l)-[likePostRel:likePostRel]->(p)",
              { id: uuid(), userId, postId }
            )
            .catch((err) => console.log(err));

          resolve({ message: "Success Like" });
        }
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async getLike(userId: string, postId: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const isLike = await neo4j()
          ?.cypher(
            "match(u:user {id:$userId})-[likeRel:likeRel]->(l:like) match(p:post {id:$postId})<-[likePostRel:likePostRel]-(l) return u",
            { userId, postId }
          )
          .catch((err) => console.log(err));
        const rLike = isLike?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rLike as IPost[]);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async createCategoryRel(
    userId: string,
    postId: string,
    categoryId:string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$userId}) match(p:post {id:$postId}) match(c:category {id:$categoryId}) match(u)-[categoryRel:categoryRel]->(c) create (c)<-[categoryPostRel:categoryPostRel]-(p) ",
            {
              userId,
              postId,
              categoryId,
            }
          )
          .catch((err) => console.log(err));

        resolve({ message: "Success Category Rel" });
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
  async getCategoryRel(categoryId:string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await neo4j()
          ?.cypher(
            "match(c:category {id:$categoryId}) match(p:post) match(c)-[categoryPostRel:categoryPostRel]->(p) return p",
            { categoryId }
          )
          .catch((err) => console.log(err));
        const rCategory = category?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        resolve(rCategory as IPost[]);
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }
}