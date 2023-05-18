import multer from "multer";

//! Storage
import { userStorage, postStorage } from "../config/multer.storage";

//! Filter
import { userFilter, postFilter } from "./multer.filter";

export const userUpload = multer({
  storage: userStorage,
  fileFilter: (_, file, cb) => userFilter({ _, file, cb }),
});

export const postUpload = multer({
  storage: postStorage,
  fileFilter: (_, file, cb) => postFilter({ _, file, cb }),
});
