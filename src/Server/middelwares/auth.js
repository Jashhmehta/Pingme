import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const isAuthenticated = async (req, res, next) => {
  console.log("Cookies received:", req.cookies); // Add this line for debugging

  const token = req.cookies["Pingme-Token"];
  if (!token) return next(new Error("Please login to access this route"));

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    next(new Error("Invalid Token"));
  }
};

export { isAuthenticated };
