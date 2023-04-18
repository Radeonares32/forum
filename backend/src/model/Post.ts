import { neo4j } from "../db/db";
import { IPost } from "../entity/IPost";

export const Post = neo4j()?.model<IPost>("post", {
  id: {
    primary: true,
    type: "uuid",
  },
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
});
