//! Dal
import { CategoryDal } from "../dal/category.dal";

//! Security
import { security } from "../secuirty/security";

//? Validation
import { validation } from "../validations/validations";

//* Services
import { UserService } from "./service";

export class CategoryService {
  private categoryDataAcess: CategoryDal = new CategoryDal();
  private userService: UserService = new UserService();
  categoryFindAll() {
    return this.categoryDataAcess.findAll();
  }
  categoryFindAllMain() {
    return this.categoryDataAcess.findAllMain();
  }
  async categoryFind(id: string) {
    const isValidId = validation.isIdValidation(id);
    if (isValidId.isValid === true) {
      return {
        post: await this.categoryDataAcess.find(id),
        message: isValidId.message,
      };
    } else {
      return {
        message: isValidId.message,
      };
    }
  }
  async categoryFindMain(id: string) {
    const isValidId = validation.isIdValidation(id);
    if (isValidId.isValid === true) {
      return {
        post: await this.categoryDataAcess.findMain(id),
        message: isValidId.message,
      };
    } else {
      return {
        message: isValidId.message,
      };
    }
  }
  async categoryRelMain(mainRel: string) {
    const isValidId = validation.isIdValidation(mainRel);
    if (isValidId.isValid === true) {
      return {
        post: await this.categoryDataAcess.getCategoryRel(mainRel),
        message: isValidId.message,
      };
    } else {
      return {
        message: isValidId.message,
      };
    }
  }
  async categoryDelete(id: string, token: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId.userId.properties.id;
        const isValidId = validation.isIdValidation(id);
        if (isValidId.isValid === true) {
          return {
            delete: await this.categoryDataAcess.delete(id, userId),
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
  async categoryUpdate(id: string, title: string, token: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userService.userFind(token)).userId.userId.properties.id;
        const isValidId = validation.isIdValidation(id);
        if (isValidId.isValid) {
          return {
            update: await this.categoryDataAcess.update(id, title),
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
  async categoryCreate(title: string, mainRel: string) {
    try {
      return {
        create: await this.categoryDataAcess.create(
          title,
          mainRel
        ),
      };
    } catch (err) {
      return {
        err,
      };
    }
  }
  async mainCreate(title: string) {
    try {
      return {
        create: await this.categoryDataAcess.mainCreate(
          title
        ),
      };
    } catch (err) {
      return {
        err,
      };
    }
  }
}
