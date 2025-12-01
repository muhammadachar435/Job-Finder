import mongoose, { Schema } from "mongoose";

const SubscribeSchema = new mongoose.Schema({
  subUid: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  emailSubscribe: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

// Use a safer model name and cache correctly
const SubscriberModel =
  mongoose.models.Subscriber || mongoose.model("Subscriber", SubscribeSchema);

export default SubscriberModel;
