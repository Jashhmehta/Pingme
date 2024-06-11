import express from "express";
import { isAuthenticated } from "../middelwares/auth.js";
import { newGroupChat } from "../controllers/chat.js";

const app = express.Router();

//After here user must be logged in to access the routes
app.use(isAuthenticated)
app.post("/newgroupchat", newGroupChat)

export default app;
