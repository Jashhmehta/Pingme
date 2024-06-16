import express from "express";
import { isAuthenticated } from "../middelwares/auth.js";
import { addMembers, getChatDetails, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, sendAttachments } from "../controllers/chat.js";
import { attachments } from "../middelwares/multer.js";

const app = express.Router();

//After here user must be logged in to access the routes
app.use(isAuthenticated)
app.post("/newgroupchat", newGroupChat)
app.get("/mychat", getMyChats)
app.get("/mygroups", getMyGroups)
app.put("/addmembers", addMembers)
app.put("/removemembers", removeMembers)
app.delete("/leave/:id",leaveGroup)
app.post("/message",attachments, sendAttachments)
app.route("/:id").get(getChatDetails).put().delete()

export default app;
