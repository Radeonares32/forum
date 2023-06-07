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
    const token: any = req.headers["x-access-token"] as string;

    const postService = new PostService();
    const { title, description, categoryId } = req.body;
    const { image } = req.files as any;
    if (image) {
      const post = await postService.postCreate(
        title,
        description,
        token,
        image[0].originalname,
        categoryId
      );
      if (post?.create?.message) {
        res.json({
          message: post?.create.message,
        });
      } else {
        res.json({
          message: post?.message,
        });
      }
    } else {
      const post = await postService.postCreate(
        title,
        description,
        token,
        "null",
        categoryId
      );
      if (post?.create?.message) {
        res.json({
          message: post?.create.message,
        });
      } else {
        res.json({
          message: post?.message,
        });
      }
    }
  };
  static updatePost: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { id, title, description, userId } = req.body;
    const { image } = req.files as any;
    const post = await postService.postUpdate(
      id,
      title,
      description,
      token,
      image[0].originalname,
      "null"
    );
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
  static postCategoryRel: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { postId, categoryId } = req.body;
    const category = await postService.postCategoryRel(
      token,
      postId,
      categoryId
    );
    if (category.message) {
      res.json({
        message: category?.message,
      });
    } else {
      res.json({
        getLike: category.postCategoryRel?.message,
      });
    }
  };
  static getCategoryRel: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const { categoryId } = req.params;
    const post = await postService.getCategoryRel(token, categoryId);
    if (post.message) {
      res.json({
        message: post?.message,
      });
    } else {
      res.json({
        getLike: post.getCategoryRel,
      });
    }
  };
  static getUserRelPost: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const postService = new PostService();
    const post = await postService.getUserRelPost(token);
    if (post.message) {
      res.json({
        message: post?.message,
      });
    } else {
      res.json({
        getPost: post.getPost,
      });
    }
  };
  static getPostRelComment: Handler = async (req, res) => {
    const postService = new PostService();
    const { postId } = req.body;
    const post = await postService.getPostRelComment(postId);
    if (post.message) {
      res.json({
        message: post?.message,
      });
    } else {
      res.json({
        getPost: post.comment,
      });
    }
  };
  static getSubCommentRelComment: Handler = async (req, res) => {
    const postService = new PostService();
    const { commentId } = req.body;
    const post = await postService.getSubCommentRelComment(commentId);
    if (post.message) {
      res.json({
        message: post?.message,
      });
    } else {
      res.json({
        getPost: post.subComment,
      });
    }
  };
}
