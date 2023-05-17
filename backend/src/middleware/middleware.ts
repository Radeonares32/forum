import { userAuth } from "./auth/user.middleware";
import { postUploads } from "./multer/multer.middleware";

export const Middlewares = {
  userAuth,
  multer: {
    postUploads,
  },
};
