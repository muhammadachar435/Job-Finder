import ConnectDB from "@/Database/ConnectDB";
import Project from "../../../Model/project";
import { NextResponse } from "next/server";

// POST METHOD
export const POST = async (req) => {
  await ConnectDB();

  const projectCreate = await req.json();
  console.log("projectcreate".charAt, projectCreate);

  const { projectname, Status, Progress, Team } = projectCreate;
  {
    try {
      const projectData = await Project.create({
        projectname,
        Status,
        Progress,
        Team,
      });
      console.log(projectData);
      return NextResponse.json({ message: "Successfull" }, { status: 201 });
    } catch (err) {
      return NextResponse.json({ error: err.Stack || err.message }, { status: 500 });
    }
  }
};

// Get
export async function GET() {
  try {
    const data = await Project.find();
    console.log("project data", data);
    return NextResponse.json({ data }, { status: 201 });
  } catch (Error) {
    console.log("Error", Error);
    return NextResponse.json({ error: Error.Stack || Error.message }, { status: 500 });
  }
}
