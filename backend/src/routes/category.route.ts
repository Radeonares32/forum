import express from "express";

const app = express.Router();

//! Controllers
import { category } from "../controllers/controllers";

//Get
export const getCategory = app.get(
  "/getCategory",
  category.CategoryController.getCategory
);
export const getMainCategory = app.get('/getMainCategory', category.CategoryController.getMainCategory)
export const getCategoryId = app.get(
  "/getCategoryId",
  category.CategoryController.getCategoryId
);
export const getMainCategoryId = app.get('/getMainCategory/:mainRel', category.CategoryController.getMainCategoryId)
export const getMainRelCategory = app.get('/getMainRelCategory/:mainRel', category.CategoryController.getMainRelCategory)
//Post
export const postCategory = app.post(
  "/postCategory",
  category.CategoryController.createCategory
);
export const postMainCategory = app.post('/postMainCategory', category.CategoryController.mainCreateCategory)
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
