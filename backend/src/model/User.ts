import { neo4j } from "../db/db";
import { IUser } from "../entity/IUser";

export const User = neo4j()?.model<IUser>("user", {
  id: {
    primary: true,
    type: "uuid",
  },
  nickname: {
    type: "string",
  },
  email: {
    type: "string",
  },
  date: {
    type: "string",
  },
  gender: {
    type: "string",
  },
  password: {
    type: "string",
  },
});
