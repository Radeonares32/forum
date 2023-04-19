import express from "express";

const app = express.Router();

//! Controllers
import { post } from "../controllers/controllers";

//Get
export const getPost = app.get("/getPost", post.PostController.getPost);
export const getPostId = app.get("/getPostId", post.PostController.getPostId);
export const getLike = app.get('/getLike',post.PostController.getLike)
//Post
export const postPost = app.post("/postPost", post.PostController.createPost);
export const postComment = app.post('/postComment',post.PostController.createComment)
export const postSubComment = app.post('/postSubComment',post.PostController.createSubComment)
export const postLike = app.post('/postLike',post.PostController.createLike)
export const postCategoryRel = app.post('/categoryRel',post.PostController.postCategoryRel)

//Put
export const putPost = app.put('/putPost',post.PostController.updatePost)

//delete
export const deletePost = app.delete('/deletePost',post.PostController.deletePost)