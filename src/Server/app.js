import express from "express";

import { connectDB, getSockets } from "./utils/features.js";

import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { errorMiddleware } from "./middelwares/error.js";
import { Message } from "./models/message.js";
import chatRoute from "./routes/chat.js";
import userRoute from "./routes/user.js";
import { socketAuthenticator } from "./middelwares/auth.js";
import { START_TYPING, STOP_TYPING } from "../constants/events.js";

dotenv.config({
  path: "src/server/.env",
});
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
app.set("io", io);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3001;
export const env_mode = process.env.NODE_ENV.trim() || "PRODUCTION";
export const userSocketIDs = new Map();
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});
io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res || {}, (err) => {
    if (err) return next(err);
    socketAuthenticator(socket, next);
  });
});

io.on("connection", (socket) => {
  const user = socket.user;

  userSocketIDs.set(user._id.toString(), socket.id);
  socket.on(START_TYPING, ({ members, chatId }) => {
    const membersSocket = getSockets(members);
    socket.to(membersSocket).emit(START_TYPING, { chatId });
  });

  socket.on(STOP_TYPING, ({ members, chatId }) => {
    const membersSocket = getSockets(members);
    socket.to(membersSocket).emit(STOP_TYPING, { chatId });
  });

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
  });

  socket.on("disconnect", () => {
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);
server.listen(3001, () => {
  console.log(`Server is running on port ${port} in ${env_mode} mode`);
});
