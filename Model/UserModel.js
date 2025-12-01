import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Expert"],
  },
  location: { type: String, required: true },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-Time", "Part-Time", "Remote"],
  },
});

const userModel =
  mongoose.models.userModel || mongoose.model("userModel", userSchema);
export default userModel;
