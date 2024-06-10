
import express from "express";
import { login, register } from "../controllers/user.js";
import {singleAvatar} from "../middelwares/multer.js"
const app=express.Router();
app.post("/login",login);
app.post("/register",singleAvatar,register);

export default app
