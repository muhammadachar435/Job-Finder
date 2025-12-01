import { getLogged } from "@/Database/auth";
import ConnectDB from "@/Database/ConnectDB";
import SubscriberModel from "@/Model/subscribe";
import nodemailer from "nodemailer";

// Get Data
export async function GET() {
  await ConnectDB();
  const user = await getLogged();
  if (user instanceof Response) {
    return user;
  }
  // return new Response(user);
  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  await ConnectDB();

  const { emailSubscribe, subUid } = await request.json();
  if (!emailSubscribe || !subUid)
    return new Response(JSON.stringify({ error: "Enter Email" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

  const existingEmail = await SubscriberModel.findOne({ emailSubscribe });
  if (existingEmail)
    return new Response(JSON.stringify({ error: "Email already exists" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });

  const userSubScribe = await SubscriberModel.create({
    emailSubscribe,
    subUid,
  });

  if (!userSubScribe)
    return new Response(JSON.stringify({ error: "Subscription failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });

  // ---- Send "Thank You" Email ----
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      // eslint-disable-next-line no-undef
      from: process.env.EMAIL_USER,
      to: emailSubscribe, // subscriber email
      subject: "Subscription Confirmed ",
      html: `<h1>Thank You for Subscribing!</h1><p>You are now subscribed to our newsletter.</p>`,
    });
  } catch (err) {
    console.error("Email sending error:", err);
  }

  return new Response(
    JSON.stringify({
      userSubScribe,
      message: "Subscribed successfully! Check your email.",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
