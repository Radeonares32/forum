//! Dal
import { UserDal } from "../dal/user.dal";

//? Validation
import { validation } from "../validations/validations";

//* Security
import { security } from "../secuirty/security";

//* Cache
import { cache } from "../cache/cache";

export class UserService {
  private userDataAcess: UserDal = new UserDal();
  userFindAll() {
    return this.userDataAcess.findAll();
  }
  userFindId(id:string) {
    return this.userDataAcess.findUser(id);
  }
  async userFind(token: string) {
    try {
      const email: any = security.jwt.token.verifyToken(token);

      if (email.message === "Authorized") {
        const user: any = await this.userDataAcess
          .find(email.token?.payload?.email)
          .catch((err) => console.log(err));
        return {
          user,
          userId: user[0][0],
          message: email.message,
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
  async postComplain(token: string, title: string, description: string) {
    try {
      const email = security.jwt.token.verifyToken(token);
      if (email.message === "Authorized") {
        const userId = (await this.userFind(token)).userId.properties.id;
        return {
          complain: (
            await this.userDataAcess.postComplain(userId, title, description)
          ).message,
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
  async getComplain() {
    try {
      return {
        complain: await this.userDataAcess.getComplain(),
      };
    } catch (err) {
      return {
        complain: err,
      };
    }
  }
  userDelete(id: string) {
    const isValidId = validation.isIdValidation(id);
    if (isValidId.isValid === true) {
      return {
        delete: this.userDataAcess.delete(id),
      };
    } else {
      return {
        message: isValidId.message,
      };
    }
  }
  userUpdate(
    id: string,
    nickname: string,
    email: string,
    bio: string,
    image: string,
    note: string
  ) {
    const isValidId = validation.isIdValidation(id);
    const isEmail = validation.isEmailValidation(email);

    if (isValidId.isValid) {
      if (isEmail.isEmail) {


        return {
          update: this.userDataAcess.update(
            id,
            nickname,
            email,

            bio,
            image,
            note
          ),
        };

      }
      else {
        return {
          message: isEmail.message,
        };
      }
    } else {
      return {
        message: isValidId.message,
      };
    }
  }
  async userCreate(
    nickname: string,
    email: string,
    password: string,
    bio: string,
    image: string,
    note: string
  ) {
    const hash = security.bcrypt.encrypt(password);
    const isEmail = validation.isEmailValidation(email);
    if (isEmail.isEmail) {
      return {
        create: this.userDataAcess.create(
          nickname,
          email,
          hash,
          bio,
          image,
          note
        ),
      };
    } else {
      return {
        message: "email not valid",
      };
    }
  }
  async userFollow(follow: string, followers: string) {
    if (follow || followers) {
      return {
        follow: this.userDataAcess.follow(follow, followers),
      };
    } else {
      return {
        message: "follow || followers prop empty",
      };
    }
  }
  async userUnFollow(follow: string, followers: string) {
    if (follow || followers) {
      return {
        follow: this.userDataAcess.unFollow(follow, followers),
      };
    } else {
      return {
        message: "follow || followers prop empty",
      };
    }
  }
  async userGetFollow(id: string) {
    if (id) {
      return {
        follow: await this.userDataAcess.getFollow(id),
      };
    } else {
      return {
        message: "id prop empty",
      };
    }
  }
  async userFindEmail(email: string) {
    if (email) {
      return {
        userEmail: await this.userDataAcess.getUserEmail(email),
      };
    } else {
      return {
        message: "id  prop empty",
      };
    }
  }
  async userSign(email: string, password: string) {
    const isEmail = validation.isEmailValidation(email);
    if (isEmail.isEmail) {
      const isUser: any = await this.userDataAcess.getUserEmail(email);
      if (isUser.length > 0) {
        const isHashTrue = security.bcrypt.dencrypt(password, isUser[0][1]);
        if (isHashTrue.isDencrypt) {
          const payload = {
            email: isUser[0][0],
          };
          try {
            return {
              token: (await cache.redis.Token.addToken(payload)).token,
              exp:(await cache.redis.Token.addToken(payload)).exp
            };
          } catch {
            return {
              token: security.jwt.payload.signPayload(payload).err,
            };
          }
        } else {
          return {
            sign: isHashTrue.message,
          };
        }
      } else {
        return {
          sign: "users not fount",
        };
      }
    } else {
      return {
        sign: isEmail.message,
      };
    }
  }
  async userLogout(token: string) {
    try {
      const delToken = await cache.redis.Token.deleteToken(token);
      if (delToken.message) {
        return {
          message: delToken.message,
        };
      } else {
        return {
          message: delToken.status,
        };
      }
    } catch (err) {
      return {
        message: err,
      };
    }
  }
  async userGetFollowers(id: string) {
    if (id) {
      return {
        followers: await this.userDataAcess.getFollowers(id),
      };
    } else {
      return {
        message: "id prop empty",
      };
    }
  }
}
