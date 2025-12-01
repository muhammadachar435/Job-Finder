import ConnectDB from "@/Database/ConnectDB";
import JobApplicant from "@/Model/userApplicant";

// Job Applicant POST METHOD
export async function POST(request) {
  try {
    await ConnectDB();
    const CandidateApplicant = await request.json();
    console.log("candidateapplicant", CandidateApplicant);
    const { ApplicantName, ApplicantEmail, ApplicantRole, ApplicantExperience, ApplicantJobType } =
      CandidateApplicant;

    const ApplicantUser = await JobApplicant.create({
      ApplicantName,
      ApplicantEmail,
      ApplicantRole,
      ApplicantExperience,
      ApplicantJobType,
    });
    console.log("Applicant form ", ApplicantUser);
    return Response.json({ ApplicantEmail: ApplicantUser.ApplicantEmail }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: "Already submit form this Email" }, { status: 404 });
    } else {
      return Response.json({ error: error.stack || error.message }, { status: 500 });
    }
  }
}
