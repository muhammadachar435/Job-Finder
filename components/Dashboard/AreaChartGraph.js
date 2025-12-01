"use client";
import { useState } from "react";
import { Monthly, Quartely, yearData, pieData } from "../../data/AreaChart";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
function AreaChartGraph() {
  const [timePeriod, setTimeperiod] = useState("month");

  const JobPostingData =
    timePeriod === "year" ? yearData : timePeriod === "quarter" ? Quartely : Monthly;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-transparent backdrop-blur-2xl p-5 rounded-2xl shadow-2xl ">
          <p className="text-base font-bold text-gray-800 mb-3 pb-2 border-b border-gray-500">{label}</p>
          <div className="space-y-2">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shadow-lg"
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  <span className="text-sm text-gray-600 font-medium">{entry.name}:</span>
                </div>
                <span className="text-sm font-bold" style={{ color: entry.color }}>
                  {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const currentData = JobPostingData[JobPostingData.length - 1];
  const fillRate = ((currentData.filled / currentData.posted) * 100).toFixed(1);
  const conversionRate = ((currentData.hired / currentData.applicants) * 100).toFixed(1);

  return (
    <>
      <div className="desktop:flex desktop:justify-between desktop:mr-2">
        {/* Main Area Chart - Premium Design */}
        <div className="justify-center bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg small:p-4 tablet:p-6 mb-8 border border-white/50 small:w-[230px] medium:w-[270px] large:w-[290px] tablet:w-[650px] desktop:w-[550px]  mac:w-[720px]   small:mx-auto desktop:mx-0">
          <div className="mb-8 ">
            <div className="my-1">
              <h2 className="small:text-xl tablet:text-2xl mac:text-3xl font-inter font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                Job Postings vs Positions Filled
              </h2>
              <p className="text-gray-600 font-inter small:text-sm desktop:text-base">
                Track hiring performance over time
              </p>
            </div>
            <div className="flex justify-evenly small:gap-1 medium:gap-3 bg-gray-100 p-1.5 rounded-2xl my-4 mac:w-[300px] desktop:ml-auto">
              <button
                onClick={() => setTimeperiod("month")}
                className={`px-1 cursor-pointer tablet:px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                  timePeriod === "month"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeperiod("quarter")}
                className={`px-1 cursor-pointer tablet:px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                  timePeriod === "quarter"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Quarter
              </button>
              <button
                onClick={() => setTimeperiod("year")}
                className={`px-1  cursor-pointer tablet:px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                  timePeriod === "year"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Year
              </button>
            </div>
          </div>

          <div className="border-none outline-none small:w-[200px] medium:w-[250px] large:w-[280px] tablet:w-[600px]  desktop:w-full desktop:max-w-[650px] h-auto ">
            <ResponsiveContainer width="100%" height={350} className="border-none outline-none ">
              <AreaChart
                data={JobPostingData}
                margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
                className="border-none outline-none"
              >
                <defs>
                  <linearGradient id="colorPosted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorFilled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.7} />
                    <stop offset="50%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeWidth={1.5} />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                  tick={{ fill: "#374151" }}
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: "14px", fontWeight: 600 }}
                  tick={{ fill: "#374151" }}
                />
                <Tooltip content={<CustomTooltip />} />

                <Legend
                  content={() => (
                    <div className="flex justify-center gap-10 align-middle text-base font-600 color-[#333]">
                      <span style={{ color: "#22c55e" }}>● Positions Filled</span>
                      <span style={{ color: "#3b82f6" }}>● Job Postings</span>
                    </div>
                  )}
                />
                <Area
                  type="monotone"
                  dataKey="filled"
                  stroke="#10b981"
                  strokeWidth={4}
                  strokeDasharray="10 5"
                  fill="url(#colorFilled)"
                  fillOpacity={1}
                  name="Positions Filled"
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6, stroke: "#fff" }}
                  activeDot={{ r: 8, strokeWidth: 3 }}
                />
                <Area
                  type="monotone"
                  dataKey="posted"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  fill="url(#colorPosted)"
                  fillOpacity={1}
                  name="Job Postings"
                  backgroundColor="transparent"
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6, stroke: "#fff" }}
                  activeDot={{ r: 8, strokeWidth: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Summary */}
          <div className="grid small:grid-cols-1 tablet:grid-cols-3 gap-6 mt-1 pt-8 border-t-2 border-gray-200 place-items-center">
            <div className="text-center bg-purple-100 w-fit mx-auto p-2 rounded-md">
              <p className="text-sm text-gray-500 font-semibold mb-2">Fill Rate</p>
              <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {fillRate}%
              </p>
              <p className="text-xs text-green-600 mt-2 font-semibold">Above target</p>
            </div>
            <div className="text-center bg-green-100 w-fit mx-auto p-2 rounded-md">
              <p className="text-sm text-gray-500 font-semibold mb-2">Conversion Rate</p>
              <p className="text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {conversionRate}%
              </p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">Applicants to hired</p>
            </div>
            <div className="text-center bg-orange-100 w-fit mx-auto p-2 rounded-md">
              <p className="text-sm text-gray-500 font-semibold mb-2">Avg. Time to Fill</p>
              <p className="text-3xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                12d
              </p>
              <p className="text-xs text-gray-500 mt-2 font-semibold">Industry avg: 18d</p>
            </div>
          </div>
        </div>

        {/* Pie Charts Section */}

        <div className="bg-white rounded-xl p-4 shadow-lg small:w-[230px] medium:w-[270px] large:w-[290px] tablet:w-[650px] desktop:w-[360px] mac:w-[500px] widescreen:w-[550px] small:mx-auto desktop:mx-0 border-none focus:outline-none h-[450px]">
          <h2 className="small:text-xl tablet:text-2xl mac:text-3xl font-inter font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Job Status Overview
          </h2>
          <div className="small:w-[200px] medium:w-[240px] large:w-[250px] tablet:w-[600px] desktop:w-[340px] mac:w-[450px] h-[450px] ">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(128, 128, 128, 0.5)", // light yellow transparent background
                    border: "1px solid rgba(255, 255, 255, 0.2)", // subtle border

                    borderRadius: "8px",
                    backdropFilter: "blur(6px)", // smooth glass effect
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                  itemStyle={{
                    color: "white", // text color (yellow)
                    fontWeight: "600",
                  }}
                  labelStyle={{
                    color: "#FFFFFF", // label color
                    fontWeight: "500",
                  }}
                />
                <Legend
                  content={() => (
                    <div className="flex justify-center gap-8 align-middle pt-5 text-base font-600 text-[#333]">
                      <span style={{ color: "#22c55e" }}>● Hired</span>
                      <span style={{ color: "#3b82f6" }}>● Posted</span>
                      <span style={{ color: "#facc15" }}>● Filled</span>
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie Chart */}
      </div>
    </>
  );
}

export default AreaChartGraph;
