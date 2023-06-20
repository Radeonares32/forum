import { v4 as uuid } from "uuid";

//? Repository
import { PostRepository } from "../repository/post.repository";
//? Entity
import { IPost } from "../entity/IPost";

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
    image: string,
    userId: string,
    categoryId: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match(u:user {id:$userId}) match(c:category {id:$categoryId}) create (p:post {id:$id,title:$title,description:$description,image:$image}) create(u)-[postRel:postRel]->(p) create(p)-[categoryPostRel:categoryPostRel]->(c)",
            {
              title,
              description,
              image,
              userId,
              categoryId,
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
            "match (p:post {id:$id})<-[postRel:postRel]-(u:user) return u,p",
            { id }
          )
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
  async findAll(): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.readCypher("match (u:user)-[:postRel]-(p:post) return u,p", {})
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
  async getPostRelComment(postId: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.readCypher(
            "match (u:user)-[:commentUserRel]->(c:comment)-[:commentPostRel]->(p:post{id:$postId}) return u,c",
            { postId }
          )
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
  async getSubCommentRelComment(commentId: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const post: any = await neo4j()
          ?.readCypher(
            "match (u:user)-[:subCommentUserRel]->(c:comment)-[:subCommentCommentRel]->(c1:comment {id:$commentId}) return u,c",
            { commentId }
          )
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
    image: string,
    categoryId: string
  ): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        await neo4j()
          ?.writeCypher(
            "match (p:post {id:$id}) set p.title=$title,p.description=$description,p.image=$image return p",
            {
              id,
              title,
              description,
              image,
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
  async savePost(userId: string, postId: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const isLike = await neo4j()
          ?.cypher(
            "match(user{id:$userId}) match(p) match(u)-[:savedPostRel]->(p) return p,u",
            { userId }
          )
          .catch((err) => console.log(err));
        const rLike: any = isLike?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        if (rLike?.length) {
          await neo4j()
            ?.writeCypher(
              "match(user{id:$userId}) match(p:post) match(u)-[s:savedPostRel]->(p) delete s",
              {
                userId,
              }
            )
            .catch((err) => console.log(err));
          resolve({ message: "Success unsaved post" });
        } else {
          await neo4j()
            ?.writeCypher(
              "match(u:user {id:$userId}) match(p:post {id:$postId}) create(u)-[savedPostRel:savedPostRel]->(p)",
              {
                userId,
                postId,
                id: uuid(),
              }
            )
            .catch((err) => console.log(err));
          resolve({ message: "Success saved post" });
        }
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
            "match(u:user {id:$userId}) match(p:post{id:$postId}) match(u)-[:likePostRel]->(p) return p",
            { userId, postId }
          )
          .catch((err) => console.log(err));
        const rLike: any = isLike?.records.map((uss: any) => {
          return uss.map((res: any) => {
            return res.properties;
          });
        });
        if (rLike?.length > 0) {
          await neo4j()
            ?.writeCypher(
              "match(u:user {id:$userId}) match(p:post{id:$postId}) match (u)-[l:likePostRel]->(p) delete l",
              {
                userId,
                postId,
              }
            )
            .catch((err) => console.log(err));
          resolve({ message: "Success unLike" });
        } else {
          await neo4j()
            ?.writeCypher(
              "match(u:user {id:$userId}) match(p:post{id:$postId}) create(u)-[:likePostRel]->(p) return p",
              { userId, postId }
            )
            .catch((err) => console.log(err));

          resolve({ message: "Success Like" });
        }
      } catch (err) {
        reject({ message: "Error " + err });
      }
    });
  }

  async getSavedPost(userId: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const isLike = await neo4j()
          ?.cypher(
            "match(user{id:$userId}) match(p) match(u1:user) match(u)-[:savedPostRel]->(p) match(u1)-[:postRel]->(p) return u1,p",
            { userId }
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
  async getLike(userId: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const isLike = await neo4j()
          ?.cypher(
            "match(user{id:$userId}) match(p:post) match(u1:user) match(u)-[:likePostRel]->(p) match(u1)-[:postRel]->(p) return u1,p",
            { userId }
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
    categoryId: string
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
  async getCategoryRel(categoryId: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await neo4j()
          ?.cypher(
            "match(c:category {id:$categoryId}) match(p:post) match(p)-[categoryPostRel:categoryPostRel]->(c) match(u:user)-[postRel:postRel]->(p) return p,u",
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
  async getUserRelPost(userId: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await neo4j()
          ?.cypher(
            "match(u:user {id:$userId})-[postRel:postRel]->(p:post) return u,p",
            { userId }
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
  async getMainPostAll(mainId: string): Promise<IPost[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const main = await neo4j()?.cypher(
          "match (m:main {id:$mainId})  match(c:category) match(p:post) match(u:user) match(m)-[:categoryRel]->(c)<-[:categoryPostRel]-(p) match(u)-[:postRel]->(p) return p,u",
          { mainId }
        );
        const rCategory = main?.records.map((uss: any) => {
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
