import express from "express";

import { connectDB, getSockets } from "./utils/features.js";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import { v4 as uuid } from "uuid";

import { errorMiddleware } from "./middelwares/error.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { Message } from "./models/message.js";

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
export const userSocketIDs = new Map();
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
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log("User connected", socket.id);
  console.log("User Socket IDs", userSocketIDs);

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
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    const usersSocket = getSockets(members);
    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });
    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.log(error);
    }
    console.log("New Message", messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});
app.use(errorMiddleware);
server.listen(3001, () => {
  console.log(`Server is running on port ${port} in ${env_mode} mode`);
});
