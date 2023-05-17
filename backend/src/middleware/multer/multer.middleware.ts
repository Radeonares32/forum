import { postUpload } from "./config/multer.upload";

export const postUploads = postUpload.fields([{ name: "image", maxCount: 1 }]);
