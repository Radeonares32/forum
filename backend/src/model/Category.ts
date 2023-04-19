import { neo4j } from "../db/db";
import { ICategory } from "../entity/ICategory";

export const Category = neo4j()?.model<ICategory>("category", {
  id: {
    primary: true,
    type: "uuid",
  },
  title: {
    type: "string",
  }
});
