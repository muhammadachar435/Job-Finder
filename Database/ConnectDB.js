import mongoose from "mongoose";

// eslint-disable-next-line no-undef
const DB_URL = process.env.DB_URL;

export default function ConnectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already Database Connect");
    } else if (mongoose.connection.readyState === 0) {
      mongoose.connect(DB_URL, { dbName: "UserModel" });
      console.log("Database Create");
    } else if (mongoose.connection.readyState === 3) {
      mongoose.connection.close();
      console.log("Database Close");
    }
  } catch (error) {
    console.log("Something Database Error", error);
  }
}
