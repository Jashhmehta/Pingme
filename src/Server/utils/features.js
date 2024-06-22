import mongoose, { connect } from "mongoose";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { userSocketIDs } from "../app.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
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

const emitEvent = (req, event, users, data) => {
  console.log("Emmiting event", event);
};
const getOtherMembers = (members, userId) => {
  return members.find((member) => member._id.toString() !== userId.toString());
};
export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user._id.toString()));
  return sockets;
};

const getBase64 = (file) => {
  const base64String = file.buffer.toString("base64");
  return `data:${file.mimetype};base64,${base64String}`;
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
  } catch (error) {
    throw new Error("Error uploading files to cloudinary", error);
  }
};
const deleteFilesFromCloudinary = async (public_ids) => {};
export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  getOtherMembers,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
