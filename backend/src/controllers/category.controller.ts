import { Handler } from "express";
//! Service
import { CategoryService } from "../service/service";

export class CategoryController {
  static getCategory: Handler = async (req, res) => {
    const category = await new CategoryService().categoryFindAll();
    res.json({ category });
  };
  static getMainCategory: Handler = async (req, res) => {
    const category = await new CategoryService().categoryFindAllMain();
    res.json({ category });
  };
  static getCategoryId: Handler = async (req, res) => {
    const { id } = req.body;
    const category = new CategoryService().categoryFind(id);
    res.json({ category: await category });
  };
  static getMainCategoryId: Handler = async (req, res) => {
    const { mainRel } = req.params;
    const category = new CategoryService().categoryFindMain(mainRel);
    res.json({ category: await category });
  };
  static getMainRelCategory: Handler = async (req, res) => {
    const { mainRel } = req.params;
    const category = new CategoryService().categoryRelMain(mainRel);
    res.json({ category: await category });
  };
  static createCategory: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const categoryService = new CategoryService();
    const { title, mainRel } = req.body;
    const category = await categoryService.categoryCreate(title, mainRel);
    if (category?.create?.message) {
      res.json({
        message: category?.create.message,
      });
    } else {
      res.json({
        message: category?.err,
      });
    }
  };

  static mainCreateCategory: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const categoryService = new CategoryService();
    const { title } = req.body;
    const category = await categoryService.mainCreate(title);
    if (category?.create?.message) {
      res.json({
        message: category?.create.message,
      });
    } else {
      res.json({
        message: category?.err,
      });
    }
  };
  static updateCategory: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const categoryService = new CategoryService();
    const { id, title } = req.body;
    const category = await categoryService.categoryUpdate(id, title, token);
    if (category?.message) {
      res.json({
        message: category.message,
      });
    } else {
      res.json({
        message: category?.update?.message,
      });
    }
  };
  static deleteCategory: Handler = async (req, res) => {
    const token: any = req.headers["x-access-token"];
    const categoryService = new CategoryService();
    const { id } = req.body;
    const category = await categoryService.categoryDelete(id, token);
    if (category.message) {
      res.json({
        message: category.message,
      });
    } else {
      res.json({
        message: category.delete?.message,
      });
    }
  };
}
