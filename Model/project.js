import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const createProject = new mongoose.Schema({
  projectId: {
    type: String,
    default: () => "PRJ-" + uuidv4().slice(0, 8), // automatic random ID like PRJ-a1b2c3d4
    unique: true,
  },
  projectname: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Completed", "InProgress", "Hold", "Pending", "Cancelled", "NotStarted"],
    default: "Pending", // optional default value
  },
  Progress: {
    type: String,
    required: true,
  },
  Team: {
    type: String,
    required: true,
  },
});

const Project = mongoose.models.projectDetail || mongoose.model("projectDetail", createProject);

export default Project;
