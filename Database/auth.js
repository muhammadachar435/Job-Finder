import userModel from "@/Model/UserModel";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import sessionalModel from "@/Model/Sessional";

// helped signCookie
export const signCookie = (cookie) => {
  // eslint-disable-next-line no-undef
  const signature = createHmac("sha256", process.env.COOKIE_KEY)
    .update(cookie)
    .digest("hex");
  return `${cookie}.${signature}`;
};

// Helper Verify Cookie
export const VerifyCookie = (signCookie) => {
  if (!signCookie) return false;
  const parts = signCookie.split(".");
  if (!parts.length === 2) return false;

  const [cookie, signature] = parts;
  // eslint-disable-next-line no-undef
  const expectedSignature = createHmac("sha256", process.env.COOKIE_KEY)
    .update(cookie)
    .digest("hex");
  return signature === expectedSignature ? cookie : false;
};

// Logout Session
export async function getLogout() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("userId").value;
  return VerifyCookie(cookieValue);
}

// Get function Logged
export async function getLogged() {
  const cookieStore = await cookies();
  const cookieGet = await cookieStore.get("userId");
  if (!cookieGet || !cookieGet.value) {
    return Response.json({ Error: "Id not found " }, { status: 401 });
  }
  const cookieValue = await cookieGet.value;
  const sessionID = VerifyCookie(cookieValue);
  if (!sessionID)
    return Response.json({ error: "UserId Not Be Verifeied" }, { status: 401 });

  // sessionmodel find ID
  const session = await sessionalModel.findById(sessionID);
  if (!session)
    return Response.json({ error: "Not Session ID" }, { status: 401 });

  const user = await userModel
    .findById(session.userId)
    .select("-password -__v");

  if (!user) {
    console.error("User not found");
    return Response.json({ error: "User not Found" }, { status: 401 });
  }

  console.log("Authenticated user:", user.name || user._id);
  return user;
}
