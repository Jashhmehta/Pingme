import express from "express";
import { getMyProfile, login, register } from "../controllers/user.js";
import { singleAvatar } from "../middelwares/multer.js";
import { isAuthenticated } from "../middelwares/auth.js";
const app = express.Router();

app.post("/login", login);
app.post("/register", singleAvatar, register);

//After here user must be logged in to access the routes

app.get("/profile",isAuthenticated ,getMyProfile)

export default app;
