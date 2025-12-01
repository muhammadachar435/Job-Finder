"use client";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function loadActivities() {
      const res = await fetch("/api/activity", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch activities");
      const data = await res.json();
      setActivities(data);
    }

    loadActivities();
  }, []);
  console.log("Activity Data", activities);
  return (
    <div
      className={` ${
        activities.length > 5 ? "overflow-y-scroll" : "overflow-y-hidden"
      } relative small:w-[280px] large:w-[300px] tablet:w-[650px] desktop:w-[360px] mac:w-[500px] widescreen:w-[550px]  bg-white rounded-xl shadow-lg  mx-auto border border-slate-300 py-4 h-full max-h-[420px] `}
    >
      <h1 className="text-xl font-inter font-medium py-2 px-4">Recent Activity</h1>
      <div className="w-full h-[1px] bg-slate-300 my-2"></div>
      {activities.length > 0 ? (
        <>
          {activities.map((item, i) => (
            <div key={i} className="flex space-x-2 rounded m-4">
              <div className="w-6 h-6 bg-blue-300 rounded-full relative mt-[2px]">
                <div className="w-2 h-2 rounded-full bg-blue-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div>
                <h3 className="font-600 font-inter text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  {item.subTitle} - {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-inter text-xl font-semibold">
            No activity available yet
          </p>
        </>
      )}
    </div>
  );
}
