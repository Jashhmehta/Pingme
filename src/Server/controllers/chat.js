import { TryCatch } from "../middelwares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { emitEvent, getOtherMembers } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { Preview } from "@mui/icons-material";
const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;
  if (members.length < 2)
    return next(
      new ErrorHandler("Group chat must have atleast 3 members", 400)
    );
  const allMembers = [...members, req.user];
  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });
  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);
  return res.status(201).json({
    success: true,
    message: "Group created",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name  avatar"
  );
  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMembers(members, req.user);
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      },[]),
    };
  });
  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

export { newGroupChat, getMyChats };
