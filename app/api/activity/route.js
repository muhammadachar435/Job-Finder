import ConnectDB from "@/Database/ConnectDB";
import Activityschema from "@/Model/Activity";

export async function GET() {
  try {
    await ConnectDB();

    const activities = await Activityschema.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(activities), { staus: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Activity Error" }), { status: 500 });
  }
}
