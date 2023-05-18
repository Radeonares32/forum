import { userAuth } from "./auth/user.middleware";
import { postUploads,userUploads } from "./multer/multer.middleware";

export const Middlewares = {
  userAuth,
  multer: {
    postUploads,
    userUploads
  },
};
