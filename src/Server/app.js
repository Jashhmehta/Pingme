import express from "express";

import { connectDB } from "./utils/features.js";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import { v4 as uuid } from "uuid";

import { errorMiddleware } from "./middelwares/error.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { NEW_MESSAGE } from "./constants/events.js";

dotenv.config({
  path: "src/server/.env",
});
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

const app = express();
const server = createServer(app);
const io = new Server(server, {});
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3001;
export const env_mode = process.env.NODE_ENV.trim() || "PRODUCTION";
app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});
io.on("connection", (socket) => {
  const user = {
    _id: "1",
    name: "Jash",
  };
  console.log("User connected", socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    console.log("New Message", messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
app.use(errorMiddleware);
server.listen(3001, () => {
  console.log(`Server is running on port ${port} in ${env_mode} mode`);
});
