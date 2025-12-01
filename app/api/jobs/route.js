import ConnectDB from "../../../Database/ConnectDB";
import JobModel from "../../../Model/jobs";
import { NextResponse } from "next/server";
import { Jobs } from "../..//../data/jobs";

// POST jobs
export async function POST() {
  await ConnectDB();

  try {
    const count = await JobModel.countDocuments();

    if (count === 0) {
      const insertedJobs = await JobModel.insertMany(Jobs);
      return NextResponse.json({ success: true, data: insertedJobs });
    } else {
      return NextResponse.json({ success: false, message: "Jobs already exist" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// GET jobs
export async function GET() {
  await ConnectDB();
  const jobs = await JobModel.find();
  return NextResponse.json(jobs);
}
