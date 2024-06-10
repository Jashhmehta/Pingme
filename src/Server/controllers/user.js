import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "Invalid Username" });
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid Pasword" });
  }
  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
};
const register = async (req, res) => {
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
};
export { login, register };
