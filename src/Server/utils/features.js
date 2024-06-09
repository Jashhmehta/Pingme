import mongoose, { connect } from "mongoose";

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
export {connectDB}