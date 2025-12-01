import mongoose, { model } from "mongoose";

const jobApplicant = new mongoose.Schema({
  ApplicantName: {
    type: String,
    required: true,
  },
  ApplicantEmail: {
    type: String,
    required: true,
    unique: true,
  },
  ApplicantRole: {
    type: String,
    required: true,
  },
  ApplicantExperience: {
    type: String,
    required: true,
    enum: ["6 Month", "1 Year", "2 Year", "3 Year", "3 Year Above"],
  },
  ApplicantJobType: {
    type: String,
    required: true,
    enum: ["Full-Time", "Part-Time", "Remote"],
  },
});

const JobApplicant = mongoose.models.JobApplicant || model("JobApplicant", jobApplicant);

export default JobApplicant;
