import mongoose from "mongoose";
import ConnectDB from "../../../../Database/ConnectDB";
import Job from "../../../../Model/jobs";

// Helper function
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req, context) {
  await ConnectDB();

  const params = await context.params; // ✅ unwrap Promise
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return jsonResponse({ message: "Invalid Job ID" }, 400);
  }

  const job = await Job.findById(id);

  if (!job) return jsonResponse({ message: "No Job Found" }, 404);

  return jsonResponse(job, 200);
}
