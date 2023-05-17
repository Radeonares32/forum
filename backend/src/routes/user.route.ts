import express from "express";

const app = express.Router();

//! Controllers
import { user } from "../controllers/controllers";

//Get
export const getUser = app.get("/getUser", user.UserController.getUser);
export const getUserId = app.get("/getUserId", user.UserController.getUserId);
export const getFollowUser = app.get('/getFollow',user.UserController.getFollowUser)
export const getFollowerUser = app.get('/getFollower',user.UserController.getFollowersUser)

//Post
export const postUser = app.post("/postUser", user.UserController.createUser);
export const signUser = app.post('/sign',user.UserController.signUser)
export const logoutUser = app.post('/logout',user.UserController.logoutUser)
export const followUser = app.post('/follow',user.UserController.followUser)
export const unFollowUser = app.post('/unFollow',user.UserController.unFollowUser)


//Put
export const putUser = app.put('/putUser',user.UserController.updateUser)

//delete
export const deleteUser = app.delete('/deleteUser',user.UserController.deleteUser)