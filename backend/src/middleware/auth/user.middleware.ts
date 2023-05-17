import { Handler } from "express";

import { security } from "../../secuirty/security";

import { UserService } from "../../service/user.service";

export const userAuth: Handler = async (req, res, next) => {
  const userService: UserService = new UserService();
  const token = req.headers["x-access-token"] as string;
  if (token) {
    const isVerifyToken = security.jwt.token.verifyToken(token);
    if (isVerifyToken.status) {
      res
        .status(isVerifyToken.status as number)
        .json({ message: isVerifyToken.message });
    } else {
      const email = isVerifyToken.token?.payload?.email;
      const isUser = userService.userFind(email as string);
      if ((await isUser).user) {
        next();
      } else {
        res.status(401).json({ message: "token expired" });
      }
    }
  } else {
    res.status(401).json({ message: "token not found" });
  }
};
