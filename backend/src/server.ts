import express from "express";
import http from "http";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";

const app = express();

export const server = http.createServer(app);

//! Routes
import { userRoute, postRoute, categoryRoute } from "./routes/routes";

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

app.use("/public", express.static(path.join(__dirname, "../public")));

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (data: any) => {
    io.emit('messageResponse',data)
  });
  console.log("connection");
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRoute, postRoute, categoryRoute);

if (process.env.NODE_ENV !== "test") {
  server.listen(3000, () => {
    console.log("server running");
  });
}
