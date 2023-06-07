import { IPost } from "../entity/IPost";
export interface PostRepository {
  create(
    title: string,
    description: string,
    image: string,
    userId: string,
    categoryId: string
  ): Promise<{ message: string }>;
  find(id: string): Promise<IPost>;
  findAll(): Promise<IPost[]>;
  update(
    id: string,
    title: string,
    description: string,
    image: string,
    userId: string,
    categoryId: string
  ): Promise<{ message: string }>;
  delete(id: string, userId: string): Promise<{ message: string }>;
  comment(
    userId: string,
    postId: string,
    description: string
  ): Promise<{ message: string }>;
  subComment(
    userId: string,
    commentId: string,
    description: string
  ): Promise<{ message: string }>;
  postLike(userId: string, postId: string): Promise<{ message: string }>;
  getLike(userId: string, postId: string): Promise<IPost[]>;
  createCategoryRel(
    categoryId: string,
    userId: string,
    postId: string
  ): Promise<{ message: string }>;
  getCategoryRel(categoryId: string): Promise<IPost[]>;
  getUserRelPost(userId: string): Promise<IPost[]>;
  getPostRelComment(postId: string): Promise<IPost[]>;
  getSubCommentRelComment(commentId: string): Promise<IPost[]>;
  savePost(userId: string, postId: string): Promise<{ message: string }>;
  getSavedPost(userId: string): Promise<IPost[]>;
}
