import { postUpload, userUpload } from "./config/multer.upload";

export const postUploads = postUpload.fields([{ name: "image", maxCount: 1 }]);
export const userUploads = userUpload.fields([{ name: "image", maxCount: 1 }]);
