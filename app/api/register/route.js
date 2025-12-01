import ConnectDB from "@/Database/ConnectDB";
import userModel from "@/Model/UserModel";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await ConnectDB();
    const user = await request.json();
    const { name, email, password, role, experience, location, jobType } = user;
    const hashFunction = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashFunction,
      role,
      experience,
      location,
      jobType,
    });
    console.log("New User", newUser);
    return Response.json({ name: newUser.name }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return Response.json({ error: "Duplicate Email" }, { status: 404 });
    } else {
      return Response.json(
        { error: error.stack || error.message },
        { status: 500 }
      );
    }
  }
}
