import multer from "multer";

//! Storage
import { postStorage } from "../config/multer.storage";

//! Filter
import { postFilter } from "./multer.filter";

export const postUpload = multer({
  storage: postStorage,
  fileFilter: (_, file, cb) => postFilter({ _, file, cb }),
});
