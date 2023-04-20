//! Dal
import { PostDal } from "../dal/post.dal";

//! Security
import { security } from "../secuirty/security";

//? Validation
import { validation } from "../validations/validations";

//* Services
import { UserService } from "./service";

export class PostService {
  private postDataAcess: PostDal = new PostDal();
  private userService: UserService = new UserService();
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
  async postDelete(id: string, token: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        const isValidId = validation.isIdValidation(id);
        if (isValidId.isValid === true) {
          return {
            delete: await this.postDataAcess.delete(id, userId),
          };
        } else {
          return {
            message: isValidId.message,
          };
        }
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
  async postUpdate(
    id: string,
    title: string,
    description: string,
    token: string
  ) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        const isValidId = validation.isIdValidation(id);
        if (isValidId.isValid) {
          return {
            update: await this.postDataAcess.update(
              id,
              title,
              description
            ),
          };
        } else {
          return {
            message: "not updated post",
          };
        }
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
  async postCreate(title: string, description: string, token: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        return {
          create: await this.postDataAcess.create(title, description, userId),
        };
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
        err,
      };
    }
  }
  async postComment(postId: string, description: string, token: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        return {
          comment: await this.postDataAcess.comment(
            userId,
            postId,
            description
          ),
        };
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
  async postSubComment(token: string, commentId: string, description: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        return {
          subComment: await this.postDataAcess.subComment(
            userId,
            commentId,
            description
          ),
        };
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
  async postLike(token: string, postId: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        return {
          postLike: await this.postDataAcess.postLike(userId, postId),
        };
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
  async getLike(token: string, postId: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        return {
          getLike: await this.postDataAcess.getLike(userId, postId),
        };
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
  async postCategoryRel(token: string, postId: string,categoryId:string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        return {
          postCategoryRel: await this.postDataAcess.createCategoryRel(userId,postId,categoryId),
        };
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
  async getCategoryRel(token: string, categoryId: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        return {
          getCategoryRel: await this.postDataAcess.getCategoryRel( categoryId),
        };
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
  async getUserRelPost(token: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId;
        return {
          getPost: await this.postDataAcess.getUserRelPost(userId),
        };
      } else {
        return {
          message: email.message,
        };
      }
    } catch (err) {
      return {
        message: "invalid token",
      };
    }
  }
}
