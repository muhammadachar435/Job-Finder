import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  Logo: String,
  title: String,
  company: String,
  location: String,
  type: String,
  salary: String,
  tags: [String],
  description: String,
  jobRequirement: [String],
  qualification: [String],
  posted: { type: Date, default: Date.now },
});

const JobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default JobModel;
