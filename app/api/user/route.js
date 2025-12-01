import ConnectDB from "@/Database/ConnectDB";
import { getLogged } from "@/Database/auth";

export async function GET() {
  await ConnectDB();
  const user = await getLogged();
  console.log("user", user);
  if (user instanceof Response) {
    return user;
  }
  return Response.json(user);
}
