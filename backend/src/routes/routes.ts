import express from "express";

const app = express.Router();

//Routes
import {
  deleteUser,
  followUser,
  getFollowUser,
  getFollowerUser,
  getUser,
  getUserId,
  logoutUser,
  postUser,
  putUser,
  signUser,
  unFollowUser,
} from "../routes/user.route";

import {
  deletePost,
  getPost,
  getPostId,
  postPost,
  putPost,
} from "../routes/post.route";

export const userRoute = app.use(
  "/user",
  deleteUser,
  followUser,
  getFollowUser,
  getFollowerUser,
  getUser,
  getUserId,
  logoutUser,
  postUser,
  putUser,
  signUser,
  unFollowUser
);
export const postRoute = app.use(
  "/post",
  deletePost,
  getPost,
  getPostId,
  postPost,
  putPost
);
