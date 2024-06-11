import express from "express";
import { isAuthenticated } from "../middelwares/auth.js";
import { getMyChats, newGroupChat } from "../controllers/chat.js";

const app = express.Router();

//After here user must be logged in to access the routes
app.use(isAuthenticated)
app.post("/newgroupchat", newGroupChat)
app.get("/mychat", getMyChats)
export default app;
