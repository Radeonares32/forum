//! Dal
import { PostDal } from "../dal/post.dal";

//? Validation
import { validation } from "../validations/validations";

export class PostService {
  private postDataAcess: PostDal = new PostDal();
  postFindAll() {
    return this.postDataAcess.findAll();
  }
  async postFind(id: string) {
    const isValidId = validation.isIdValidation(id);
    if (isValidId.isValid === true) {
      return {
        post: await this.postDataAcess.find(id),
        message: isValidId.message,
      };
    } else {
      return {
        message: isValidId.message,
      };
    }
  }
  postDelete(id: string) {
    const isValidId = validation.isIdValidation(id);
    if (isValidId.isValid === true) {
      return {
        delete: this.postDataAcess.delete(id),
      };
    } else {
      return {
        message: isValidId.message,
      };
    }
  }
  postUpdate(id: string, title: string, description: string, userId: string) {
    const isValidId = validation.isIdValidation(id);
    if (isValidId.isValid) {
      return {
        update: this.postDataAcess.update(id, title, description, userId),
      };
    } else {
      return {
        message: "not updated post",
      };
    }
  }
  async postCreate(title: string, description: string, userId: string) {
    return {
      create: this.postDataAcess.create(title, description, userId),
    };
  }
  postComment(userId: string, postId: string, description: string) {
    return {
      comment: this.postDataAcess.comment(userId, postId, description),
    };
  }
  postSubComment(userId: string, commentId: string, description: string) {
    return {
      subComment: this.postDataAcess.subComment(userId, commentId, description),
    };
  }
  postLike(userId: string, postId: string) {
    return {
      postLike: this.postDataAcess.postLike(userId, postId),
    };
  }
}
