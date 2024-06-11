import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { TryCatch } from "../middelwares/error.js";
import { ErrorHandler } from "../utils/utility.js";

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
  return res.status(200).cookie("pingme-token", "", {...cookieOptions, maxAge:0}).json({
    success: true,
    message:"Logged out successfully"
  });
};


const searchUser = async (req, res) => {
  const {name} = req.query.name;
  
  return res.status(200).json({
    success: true,
    message:name,
  });
};
export { login, register, getMyProfile, logout, searchUser };
