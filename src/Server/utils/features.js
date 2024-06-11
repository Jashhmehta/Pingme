import mongoose, { connect } from "mongoose";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: false,
};

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

  return res.status(code).cookie("Pingme-Token", token, cookieOptions).json({
    success: true,
    message,
  });
};

const emitEvent = (req,event,users,data)=>{
 console.log("Emmiting event", event)
}
const getOtherMembers=(members, userId)=>{
  members.find((member)=>member._id.toString() !==userId.toString());

  }
export { connectDB, sendToken, cookieOptions, emitEvent, getOtherMembers };
