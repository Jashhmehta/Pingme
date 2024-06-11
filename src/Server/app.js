import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middelwares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config({
  path: "src/server/.env",
});
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);
const app = express();
app.use(cors({
  credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3001;

app.use("/user", userRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(errorMiddleware);
app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
