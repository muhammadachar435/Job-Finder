/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import JobDetails from "@/components/JobApply/JobDetails";

function jobApply() {
  // States
  const [jobData, setJobData] = useState([]);
  const [close, setClose] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [Location, setLocation] = useState("");
  const [filterJob, setFilterJob] = useState(jobData);
  console.log(Location);

  // Search Functionality
  const handleSearch = () => {
    if (!searchTerm.trim() || searchTerm === " ") {
      alert("Please enter a job title search");
      return;
    }

    const result = jobData.filter((job) => {
      const search = searchTerm.toLowerCase().trim();
      const loc = Location.toLowerCase().trim();

      return (
        (!search || job.title.toLowerCase().includes(search)) &&
        (!loc || job.location.toLowerCase().includes(loc))
      );
    });

    setFilterJob(result);
    setSearchTerm("");
    setLocation("");
  };

  // Time Convert in Readable format
  function timeAgo(isoDate) {
    const now = new Date();
    const posted = new Date(isoDate);
    const diffMs = now - posted; // difference in milliseconds

    const minutes = Math.floor(diffMs / (1000 * 60));
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  // Get Data From Database
  useEffect(() => {
    async function Jobs() {
      const res = await fetch("/api/jobs", {
        method: "GET",
      });
      const data = await res.json();
      setJobData(data);
    }
    Jobs();
  }, []);

  // User Display
  return (
    <>
      <div className="mt-24 ml-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="small:space-y-3 tablet:space-y-0 tablet:flex tablet:items-center tablet:justify-between tablet:border tablet:border-gray-300 p-2 rounded-md">
              <div className="tablet:col-span-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Job title, keywords"
                    className="w-full tablet:max-w-[260px]  tablet:border-none pl-9 sm:pl-10 pr-4  py-2.5 sm:py-3  text-sm sm:text-base border border-gray-300 rounded-lg outline-none"
                  />
                </div>
              </div>
              {/* Location */}
              <div className="relative tablet:border-l border-gray-300">
                <FaLocationDot className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  value={Location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  placeholder="Location"
                  className="w-full tablet:max-w-[260px] border rounded-md  tablet:border-none tablet:outline-none pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-gray-300"
                />
              </div>
              {/* Find Job Button */}
              <div>
                <button
                  onClick={handleSearch}
                  className="w-full sm:max-w-[280px] tablet:max-w-[120px] font-inter text-base font-bold sm:w-auto px-2 py-2.5 sm:py-2  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Find Jobs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Select List */}
        <div className="small:grid small:grid-cols-1 gap-2 tablet:grid-cols-3 desktop:gap-x-10 max-w-2xl flex justify-evenly mx-auto px-4 sm:px-6 lg:px-8 py-1">
          <select
            defaultValue="jobType"
            className="border p-2 rounded outline-none bg-white border-slate-200"
          >
            <option value="jobType" disabled>
              Job Type
            </option>
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
            <option value="internship">Internship</option>
          </select>

          <select
            defaultValue="Location"
            className="border p-2 rounded outline-none bg-white border-slate-200"
          >
            <option value="Location" disabled>
              Location
            </option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
          </select>

          <select
            defaultValue="Date posted"
            className="border p-2 rounded outline-none bg-white border-slate-200"
          >
            <option value="Date posted" disabled>
              Date posted
            </option>
            <option value="Last 24 hours">Last 24 hours</option>
            <option value="Last 3 days">Last 3 days</option>
            <option value="Last 7 days">Last 7 days</option>
          </select>
        </div>

        {/* Job Listing */}
        {filterJob.length <= 0 ? (
          <>
            <div className="grid grid-cols-1 gap-y-10 tablet:grid-cols-2 mac:grid-cols-3 mx-auto justify-items-center place-items-center my-10 ">
              {jobData.map((job) => {
                console.log(job._id);
                return (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl small:p-2 small:py-4 desktop:px-4 shadow-lg w-full small:max-w-[300px] desktop:max-w-[350px] h-auto mx-auto"
                  >
                    <div className="flex  space-x-4 ">
                      <div>
                        <p className="text-xl small:text-4xl flex-shrink-0">{job.Logo}</p>
                      </div>
                      <div className="">
                        <p className="text-base font-inter font-semibold">{job.title}</p>
                        <p className="text-[#52596a] text-sm font-inter">{job.company}</p>
                        <div className=" text-[#52596a] text-xs tablet:grid tablet:grid-cols-2 gap-y-1 mt-4">
                          <p className="my-[2px]">{job.location}</p>
                          <p className="my-[2px]">{job.type}</p>
                          <p className="my-[2px]">{job.salary}</p>
                          <p className="my-[2px]">{timeAgo(job.posted)}</p>
                          <ul className="tablet:flex space-x-2 justify-between mt-1 tablet:w-[220px] text-xs">
                            {job.tags.map((jobTag, index) => {
                              return (
                                <li
                                  key={index}
                                  className="bg-[#eaf1ff] text-[#394b96] small:inline-block p-1 px-2 rounded-full font-semibold small:my-1"
                                >
                                  {jobTag}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-evenly space-x-3 mt-6">
                      <button
                        onClick={() => {
                          setClose(true);
                        }}
                        className="bg-blue-600 text-white py-2 cursor-pointer px-3 small:text-sm tablet:text-base font-inter rounded-md"
                      >
                        Apply Now
                      </button>
                      <Link
                        href={`/jobs/${job._id}`}
                        className=" text-gray-900 border border-gray-400  cursor-pointer py-2 px-3 small:text-sm tablet:text-base font-inter rounded-md hover:bg-slate-100"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-y-10 tablet:grid-cols-2 mac:grid-cols-3 mx-auto justify-items-center place-items-center my-10 ">
              {filterJob.map((job) => {
                return (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl small:p-2 small:py-4 desktop:px-4 shadow-lg w-full small:max-w-[300px] desktop:max-w-[350px] h-auto mx-auto"
                  >
                    <div className="flex  space-x-4 ">
                      <div>
                        <p className="text-xl small:text-4xl flex-shrink-0">{job.Logo}</p>
                      </div>
                      <div className="">
                        <p className="text-base font-inter font-semibold">{job.title}</p>
                        <p className="text-[#52596a] text-sm font-inter">{job.company}</p>
                        <div className=" text-[#52596a] text-xs tablet:grid tablet:grid-cols-2 gap-y-1 mt-4">
                          <p className="my-[2px]">{job.location}</p>
                          <p className="my-[2px]">{job.type}</p>
                          <p className="my-[2px]">{job.salary}</p>
                          <p className="my-[2px]">{timeAgo(job.posted)}</p>
                          <ul className="tablet:flex space-x-2 justify-between mt-1 tablet:w-[220px] text-xs">
                            {job.tags.map((jobTag, index) => {
                              return (
                                <li
                                  key={index}
                                  className="bg-[#eaf1ff] text-[#394b96] small:inline-block p-1 px-2 rounded-full font-semibold small:my-1"
                                >
                                  {jobTag}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-evenly space-x-3 mt-6">
                      <button
                        onClick={() => {
                          setClose(true);
                        }}
                        className="bg-blue-600 text-white py-2 cursor-pointer px-3 small:text-sm tablet:text-base font-inter rounded-md"
                      >
                        Apply Now
                      </button>
                      <Link
                        href={`/jobs/${job._id}`}
                        className=" text-gray-900 border border-gray-400  cursor-pointer py-2 px-3 small:text-sm tablet:text-base font-inter rounded-md hover:bg-slate-100"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <JobDetails close={close} setClose={setClose} />
      </div>
    </>
  );
}

export default jobApply;
