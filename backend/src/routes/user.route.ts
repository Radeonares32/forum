import express from "express";

const app = express.Router();

//! Controllers
import { user } from "../controllers/controllers";

//! Middleware
import { Middlewares } from "../middleware/middleware";

//Get
export const getUser = app.get("/getUser", user.UserController.getUser);
export const getUserId = app.get("/getUserId", user.UserController.getUserId);
export const getUserIds = app.get("/:id", user.UserController.getUserIds);
export const getFollowUser = app.get(
  "/getFollow",
  Middlewares.userAuth,
  user.UserController.getFollowUser
);
export const getFollowerUser = app.get(
  "/getFollower",
  Middlewares.userAuth,
  user.UserController.getFollowersUser
);
export const getComplain = app.get(
  "/getComplain",
  user.UserController.getComplain
);

//Post
export const postUser = app.post("/postUser", user.UserController.createUser);
export const postComplain = app.post(
  "/postComplain",
  Middlewares.userAuth,
  user.UserController.postComplain
);
export const signUser = app.post("/sign", user.UserController.signUser);
export const logoutUser = app.post("/logout", user.UserController.logoutUser);
export const followUser = app.post(
  "/follow",
  Middlewares.userAuth,
  user.UserController.followUser
);
export const unFollowUser = app.post(
  "/unFollow",
  Middlewares.userAuth,
  user.UserController.unFollowUser
);

//Put
export const putUser = app.put(
  "/putUser",
  [Middlewares.userAuth, Middlewares.multer.userUploads],
  user.UserController.updateUser
);

//delete
export const deleteUser = app.delete(
  "/deleteUser",
  user.UserController.deleteUser
);
