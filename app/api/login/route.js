import ConnectDB from "@/Database/ConnectDB";
import userModel from "@/Model/UserModel";
import { cookies, headers } from "next/headers";
import bcrypt from "bcryptjs";
import sessionalModel from "@/Model/Sessional";
import { signCookie } from "@/Database/auth";

export async function POST(request) {
  const cookieStore = await cookies();
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "";
  let browser = "other";
  if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Opera")) browser = "Opera";
  else if (userAgent.includes("Edge")) browser = "Edge";
  else if (userAgent.includes("Chrome")) browser = "Chrome";
  else if (userAgent.includes("Safari")) browser = "Safari";

  await ConnectDB();
  const { email, password } = await request.json();
  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return Response.json({ error: "Credential error" }, { status: 401 });
  }
  // In a session to find userId to put user id
  const session = await sessionalModel.create({ userId: user.id, browser });
  console.log("session", session);
  // users login how many browser
  const sessionFind = await sessionalModel.find({ userId: user.id }).sort({ createdAt: 1 });
  console.log("SessionFInd", sessionFind);

  // if user two or more browser login then first delete
  if (sessionFind.length > 2) {
    const oldsession = sessionFind[0];
    await sessionalModel.deleteOne({ _id: oldsession._id });
  }

  // Set Cookies
  cookieStore.set({
    name: "userId",
    value: signCookie(session.id),
    httpOnly: true,
    maxAge: 2592000, // 30 days
  });
  return Response.json({ name: user.name, email: user.email }, { status: 201 });
}
