import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { TryCatch } from "../middelwares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";

//Login user and save the token in cookie
const login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Username", 404));
  const isMatch = await compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));
  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
};

//Register a new user
const register = TryCatch(async (req, res) => {
  const { name, username, password } = req.body;

  const avatar = {
    public_id: "1",
    url: "xcw",
  };
  const user = await User.create({
    name,
    username,
    password,
    avatar,
  });
  sendToken(res, user, 201, "User Created");
});

//Fetch user profile using cookies
const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
};

const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("pingme-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

const searchUser = async (req, res) => {
  const { name = "" } = req.query;
  const myChats = await Chat.find({
    groupChat: false,
    members: req.user,
  });
  const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });
  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));
  return res.status(200).json({
    success: true,
    users,
  });
};

const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });
  if (request) return next(new ErrorHandler("Request already send", 400));
  await Request.create({
    sender: req.user,
    receiver: userId,
  });
  emitEvent(req, NEW_REQUEST, [userId]);
  return res.status(200).json({
    success: true,
    message: "Friend request sent successfully",
  });
});

const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;
  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");
  if (!request) return next(new ErrorHandler("Request not found", 404));
  if (request.receiver.toString() !== req.user.toString())
    return next(new ErrorHandler("Unauthorized", 401));
  if (!accept) {
    await Request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  }
  const members = [request.sender._id, request.receiver._id];
  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);
  emitEvent(req, REFETCH_CHATS, members);
  return res.status(200).json({
    success: true,
    message: "Friend request accepted",
    senderId: request.sender._id,
  });
});
export {
  login,
  register,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
};
