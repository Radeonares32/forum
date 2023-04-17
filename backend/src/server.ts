import express from "express";
import http from "http";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";

const app = express();
export const server = http.createServer(app);

//! Routes
import { userRoute } from "./routes/routes";

app.use(
  session({
    secret: "radeonares",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRoute);

if (process.env.NODE_ENV !== "test") {
  server.listen(3000);
}
