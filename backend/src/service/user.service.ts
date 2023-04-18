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
  async userFind(token:string) {
    try {
      const email:any = security.jwt.token.verifyToken(token)
      if (email.message === 'Authorized') {
        const user:any = await this.userDataAcess.find(email.token?.payload?.email).catch(err=>console.log(err))        
        return {
          user, 
          userId:user[0][0],
          message: email.message,
        };
      } else {
        return {
          message: email.message,
        };
      }
    }
    catch(err) {
      return {
        message:"invalid token"
      }
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
    date: string,
    oldPassword: string,
    newPassword: string,
    hash: string,
    gender: string,
    password: string
  ) {
    const isValidId = validation.isIdValidation(id);
    const isEmail = validation.isEmailValidation(email);
    const decrypt = security.bcrypt.dencrypt(oldPassword, hash);
    if (isValidId.isValid) {
      if (isEmail.isEmail) {
        if (decrypt.isDencrypt) {
          const encrypt = security.bcrypt.encrypt(newPassword);
          return {
            update: this.userDataAcess.update(
              id,
              nickname,
              email,
              date,
              gender,
              encrypt
            ),
          };
        } else {
          return {
            message: decrypt.message,
          };
        }
      } else {
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
    date: string,
    gender: string,
    password: string
  ) {
    const hash = security.bcrypt.encrypt(password);
    const isEmail = validation.isEmailValidation(email);
    if (isEmail.isEmail) {
      return {
        create: this.userDataAcess.create(nickname, email, date, gender, hash),
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
        }
    }
    else {
        return {
            message: "id prop empty"
        }
    }
}
}
