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
    const postService = new PostService();
    const { title, description, userId } = req.body;
    const post = await postService.postCreate(title, description, userId);
    if ((await post.create).message) {
      res.json({
        message: (await post.create).message,
      });
    } else {
      res.json({
        message: (await post.create)?.message,
      });
    }
  };
  static updatePost: Handler = async (req, res) => {
    const postService = new PostService();
    const {
      id,
      title,
      description,
      userId
    } = req.body;
      const post = postService.postUpdate(
        id,
        title,
        description,
        userId
      );
      if (post.message) {
        res.json({
          message: post.message,
        });
      } else {
        res.json({
          message: await post.update,
        });
      }
  };
  static deletePost: Handler = async (req, res) => {
    const postService = new PostService();
    const { id } = req.body;
    const post = postService.postDelete(id);
    if (post.message) {
      res.json({
        message: post.message,
      });
    } else {
      res.json({
        message: post.delete,
      });
    }
  };
  static createComment: Handler = async (req, res) => {
    const postService = new PostService();
    const { userId, postId,description } = req.body;
    const post = await postService.postComment(userId, postId,description);
    if ((await post.comment).message) {
      res.json({
        message: (await post.comment).message,
      });
    } else {
      res.json({
        message: (await post.comment)?.message,
      });
    }
  };
  static createSubComment: Handler = async (req, res) => {
    const postService = new PostService();
    const { userId, commentId,description } = req.body;
    const post = await postService.postSubComment(userId, commentId,description);
    if ((await post.subComment).message) {
      res.json({
        message: (await post.subComment).message,
      });
    } else {
      res.json({
        message: (await post.subComment)?.message,
      });
    }
  };
  static createLike: Handler = async (req, res) => {
    const postService = new PostService();
    const { userId, postId } = req.body;
    const post = await postService.postLike(userId, postId);
    if ((await post.postLike).message) {
      res.json({
        message: (await post.postLike).message,
      });
    } else {
      res.json({
        message: (await post.postLike)?.message,
      });
    }
  };
}
