import { getLogged } from "@/Database/auth";
import ConnectDB from "@/Database/ConnectDB";
import sessionalModel from "@/Model/Sessional";
import { cookies } from "next/headers";

export async function POST() {
  await ConnectDB();
  const cookieStore = await cookies();
  const sessionId = await getLogged();
  await sessionalModel.findByIdAndDelete(sessionId);
  cookieStore.delete("userId");
  return new Response(null, { status: 204 });
}
