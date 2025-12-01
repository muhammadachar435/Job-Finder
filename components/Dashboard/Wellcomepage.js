"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { fadeIn } from "../AnimationMotion/variants";
import { Stats } from "../../data/DashbaordStats";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function Wellcomepage() {
  const [user, setUser] = useState({ name: "" });
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user.name);

  async function fetchUser() {
    const response = await fetch(
      "/api/user",
      {
        method: "GET",
      },
      { cache: "no-store" }
    );
    if (response.status === 401) {
      return router.push("/login");
    }
    const data = await response.json();

    if (!data.error) {
      return setUser(data);
    }
  }

  return (
    <>
      <div>
        {/* Heading */}
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
        >
          <p className="small:text-2xl medium:text-[28px] tablet:text-4xl font-inter font-bold">
            Welcome back, {user.name} <span>👋</span>
          </p>
          <p className="text-slate-500">Here's What's happening with your recruitment today.</p>
        </motion.div>

        <div className="max-w-7xl mx-auto  pt-12 pb-6">
          {/* Stats Grid - Colorful Version */}
          <div className="grid small:grid-cols-1 tablet:grid-cols-2 mac:grid-cols-4 gap-6 mb-8">
            {Stats.map((stat, index) => (
              <div
                key={index}
                className={`group relative ${stat.bgColor} rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 overflow-hidden cursor-pointer small:w-[230px] medium:w-[270px] large:w-[280px] desktop:w-[350px] mac:w-[280px]  mx-auto`}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <stat.icon className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>
                    <span
                      className={`flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm ${
                        stat.trend === "up" ? "bg-white/25 text-white" : "bg-white/25 text-white"
                      } shadow-lg`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {stat.change}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
                      {stat.label === "Revenue" ? `${stat.value}K` : `${stat.value}`}
                    </h3>
                    <p className="text-base font-bold text-white/95 drop-shadow">{stat.label}</p>
                    <p className="text-sm text-white/75 font-medium">{stat.subtitle}</p>
                  </div>

                  {/* Glowing progress bar */}
                  <div className="mt-5 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                    <div
                      className="h-full bg-white/60 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${Number(stat.value)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Wellcomepage;
