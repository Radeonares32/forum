import express from "express";

const app = express.Router();

//! Controllers
import { post } from "../controllers/controllers";

//Get
export const getPost = app.get("/getPost", post.PostController.getPost);
export const getPostId = app.get("/getPostId", post.PostController.getPostId);
 
//Post
export const postPost = app.post("/postPost", post.PostController.createPost);
export const postComment = app.post('/postComment',post.PostController.createComment)
export const postSubComment = app.post('/postSubComment',post.PostController.createSubComment)
export const postLike = app.post('/postLike',post.PostController.createLike)

//Put
export const putPost = app.put('/putPost',post.PostController.updatePost)

//delete
export const deletePost = app.delete('/deleteUser',post.PostController.deletePost)