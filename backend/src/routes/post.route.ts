import express from "express";

const app = express.Router();

//! Controllers
import { post } from "../controllers/controllers";

//! Middleware
import { Middlewares } from "../middleware/middleware";

//Get
export const getPost = app.get("/getPost", post.PostController.getPost);
export const getPostId = app.get("/getPostId", post.PostController.getPostId);
export const getLike = app.get("/getLike", post.PostController.getLike);
export const getMainPostAll = app.get("/getMainPostAll/:id", post.PostController.getMainPostAll);
export const getCategoryRel = app.get(
  "/getCategoryRel/:categoryId",
  post.PostController.getCategoryRel
);
export const getUserRelPost = app.get(
  "/getUserRelPost",
  post.PostController.getUserRelPost
);
export const getUserRelImagePost = app.get(
  "/getUserRelImagePost",
  post.PostController.getUserRelImagePost
);
export const getPostRelComment = app.get(
  "/getPostRelComment",
  post.PostController.getPostRelComment
);
export const getSubCommentRelComment = app.get(
  "/getSubCommentRelComment",
  post.PostController.getSubCommentRelComment
);
export const getSavedPost = app.get(
  "/getSavedPost",
  Middlewares.userAuth,
  post.PostController.getSavedPost
);
//Post
export const postPost = app.post(
  "/postPost",
  [Middlewares.multer.postUploads, Middlewares.userAuth],
  post.PostController.createPost
);
export const postComment = app.post(
  "/postComment",
  post.PostController.createComment
);
export const postSubComment = app.post(
  "/postSubComment",
  post.PostController.createSubComment
);
export const postLike = app.post("/postLike", post.PostController.createLike);
export const postCategoryRel = app.post(
  "/categoryRel",
  post.PostController.postCategoryRel
);
export const postSavedPost = app.post(
  "/postSaved",
  Middlewares.userAuth,
  post.PostController.savedPost
);

//Put
export const putPost = app.put(
  "/putPost",
  [Middlewares.multer.postUploads, Middlewares.userAuth],
  post.PostController.updatePost
);

//delete
export const deletePost = app.delete(
  "/deletePost",
  post.PostController.deletePost
);
