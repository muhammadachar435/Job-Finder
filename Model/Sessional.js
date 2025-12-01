import mongoose, { Schema } from "mongoose";

const session = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  browser: {
    type: "String",
    reuired: true,
    enum: ["Firefox", "Chrome", "Safari", "Edge", "Opera", "other"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000, //30 days
  },
});
const sessionalModel = mongoose.models.SessionModel || mongoose.model("SessionModel", session);

export default sessionalModel;
