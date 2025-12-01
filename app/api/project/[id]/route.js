import ConnectDB from "@/Database/ConnectDB";
import Project from "../../../../Model/project";
import { AddActivity } from "../../../../Model/AddActicity";

export async function DELETE(req, { params }) {
  try {
    await ConnectDB();
    const { id } = params;
    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Project not Found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: "Project deleted successfully" }), {
      status: 200,
    }); // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    await ConnectDB();

    // await the params object
    const params = await context.params;
    const id = params.id;

    console.log("id from params:", id);

    const body = await req.json(); // fields to update
    console.log("body received:", body);

    if (body._id) delete body._id;

    const updated = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return new Response(JSON.stringify({ error: "Project not found" }), {
        status: 404,
      });
    }

    // AddActivity
    await AddActivity(`${updated.projectname}`, `${updated.Status}`);

    // 3. Return response AFTER creating activity
    return new Response(JSON.stringify({ message: "Updated successfully", data: updated }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
