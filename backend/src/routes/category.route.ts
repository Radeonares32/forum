import express from "express";

const app = express.Router();

//! Controllers
import { category } from "../controllers/controllers";

//Get
export const getCategory = app.get(
  "/getCategory",
  category.CategoryController.getCategory
);
export const getCategoryId = app.get(
  "/getCategoryId",
  category.CategoryController.getCategoryId
);
//Post
export const postCategory = app.post(
  "/postCategory",
  category.CategoryController.createCategory
);
 
//Put
export const putCategory = app.put(
  "/putCategory",
  category.CategoryController.updateCategory
);

//delete
export const deleteCategory = app.delete(
  "/deleteCategory",
  category.CategoryController.deleteCategory
);
