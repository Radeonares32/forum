import { Handler } from "express";
//! Service
import { PostService } from "../service/service";

export class PostController {
  static getPost: Handler = async (req, res) => {
    const post = await new PostService().postFindAll();
    res.json({ post });
  };
  static getPostId: Handler = async (req, res) => {
    const { id } = req.body;
    const post = new PostService().postFind(id);
    res.json({ post: await post });
  };
  static createPost: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { title, description } = req.body;
    const post = await postService.postCreate(title, description, token);
    if (post?.create?.message) {
      res.json({
        message: post?.create.message,
      });
    } else {
      res.json({
        message: post?.message,
      });
    }
  };
  static updatePost: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { id, title, description, userId } = req.body;
    const post = await postService.postUpdate(id, title, description, token);
    if (post?.message) {
      res.json({
        message: post.message,
      });
    } else {
      res.json({
        message: post?.update?.message,
      });
    }
  };
  static deletePost: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { id } = req.body;
    const post = await postService.postDelete(id, token);
    if (post.message) {
      res.json({
        message: post.message,
      });
    } else {
      res.json({
        message: post.delete?.message,
      });
    }
  };
  static createComment: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { postId, description } = req.body;
    const post = await postService.postComment(postId, description, token);
    if (post?.comment?.message) {
      res.json({
        message: post.comment.message,
      });
    } else {
      res.json({
        message: post?.message,
      });
    }
  };
  static createSubComment: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { commentId, description } = req.body;
    const post = await postService.postSubComment(
      token,
      commentId,
      description
    );
    if (post?.subComment?.message) {
      res.json({
        message: post?.subComment?.message,
      });
    } else {
      res.json({
        message: post?.message,
      });
    }
  };
  static createLike: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { postId } = req.body;
    const post = await postService.postLike(token, postId);
    if (post?.postLike?.message) {
      res.json({
        message: post?.postLike?.message,
      });
    } else {
      res.json({
        message: post?.message,
      });
    }
  };
  static getLike: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { postId } = req.body;
    const post = await postService.getLike(token, postId);
    if (post.message) {
      res.json({
        message: post?.message,
      });
    } else {
      res.json({
        getLike: post.getLike,
      });
    }
  };
}
