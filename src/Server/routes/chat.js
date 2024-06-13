import express from "express";
import { isAuthenticated } from "../middelwares/auth.js";
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers } from "../controllers/chat.js";

const app = express.Router();

//After here user must be logged in to access the routes
app.use(isAuthenticated)
app.post("/newgroupchat", newGroupChat)
app.get("/mychat", getMyChats)
app.get("/mygroups", getMyGroups)
app.put("/addmembers", addMembers)
app.put("/removemembers", removeMembers)
app.delete("/leave/:id",leaveGroup)

export default app;
