import mongoose, { connect } from "mongoose";
import jwt from "jsonwebtoken";
const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "PingMe" })
    .then((data) => {
      console.log(`Connected to DB: ${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};
const sendToken = (res, user, code, message) => {
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  return res
    .status(code)
    .cookie("Pingme-Token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    })
    .json({
      success: true,
      message,
    });
};
export { connectDB, sendToken };
