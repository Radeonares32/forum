//! Security
import { security } from "../../secuirty/security";

//? Config
import { config } from "../../config/config";

export const addToken = async (payload: {}) => {
  const redis = await config.redis();
  try {
    const token = security.jwt.payload.signPayload(payload).payload as string;
    const check = await redis.EXISTS(token);
    if (check != 1) {
      await redis.set(token, "valid");
      const payload = security.jwt.token.verifyToken(token);
      if (!payload.status) {
        const currentTime = Math.floor(Date.now() / 1000);
        const expiresIn = (payload.token?.payload?.exp as number) - currentTime;
        await redis.expire(token, expiresIn);
        return {
          token,
          exp: await redis.ttl(token),
        };
      } else {
        return {
          message: payload.message,
        };
      }
    } else {
        const del = await redis.del(token);
        await redis.set(token, "valid");
      return {
        message: "token refresh",
      };
    }
  } catch (error) {
    return {
      message: "Token not added to cache  : "+ error,
    };
  }
};
export const checkToken = async (token: string) => {
  const redis = await config.redis();
  try {
    const status = await redis.get(token);
    return {
      status,
    };
  } catch (error) {
    return {
      message: "Fetching token from cache failed",
    };
  }
};
export const deleteToken = async (token: string) => {
  const redis = await config.redis();
  try {
    const del = await redis.del(token);
    /*  await redis.flushAll();
    await redis.flushDb(); */
    return {
      status: del,
    };
  } catch (error) {
    return {
      message: "Fetching token from cache failed",
    };
  }
};
