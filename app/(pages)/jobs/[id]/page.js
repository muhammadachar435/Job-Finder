"use client";
import Link from "next/link";
import { use } from "react";
import { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";

export default function JobDetail({ params: paramsPromise }) {
  // Get Id
  const params = use(paramsPromise);
  const { id } = params;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>No job found</p>;

  return (
    <div className="mt-24 small:ml-20 p-6 desktop:mx-auto bg-white w-full small:max-w-[230px] medium:max-w-[280px] large:max-w-[320px] tablet:max-w-2xl desktop:max-w-3xl rounded-2xl shadow-xl">
      <div className="flex justify-between">
        <h1 className="small:text-base tablet:text-xl font-inter font-semibold">{job.title}</h1>
        <div className="flex space-x-2.5">
          <Link
            href="/jobs"
            className="bg-blue-600 text-white font-inter small:text-xs p-1  tablet:p-2 rounded-md"
          >
            Apply Now
          </Link>

          <Link
            href="https://www.whatsapp.com/?lang=en"
            target="blank"
            className="border flex justify-center items-center bg-slate-500 text-white font-inter px-1 tablet:p-2 rounded-md"
          >
            <FaShareAlt />
          </Link>
        </div>
      </div>
      <div className="flex space-x-2.5 my-2">
        <div className="small:text-3xl tablet:text-4xl ">{job.Logo}</div>
        <div className="">
          {/* Company name & Location */}
          <div className="tablet:flex space-x-3 space-y-1 small:my-1 tablet:my-0">
            <p className="font-inter">{job.company}</p>
            <p className="font-inter">{job.location}</p>
          </div>
          {/* Job Type */}
          <p className="font-inter  bg-blue-400 text-white inline p-1 rounded-full text-sm">
            {job.type}
          </p>
        </div>
      </div>

      {/* Job Description */}
      <div className="my-4">
        <p className="small:text-base tablet:text-xl font-inter font-semibold">About this Role</p>
        <p className="font-inter text-gray-700 flex flex-wrap">{job.description}</p>
      </div>
      {/* Job Qualification */}
      <div className="my-4">
        <p className="small:text-base tablet:text-xl font-inter font-semibold">Job Qualification</p>
        {job.qualification.map((job) => {
          return <li className="font-inter text-gray-700 mx-2 list-disc">{job}</li>;
        })}
      </div>
      {/* Job Requirement */}
      <div className="my-4">
        <p className="small:text-base tablet:text-xl font-inter font-semibold">Job Requirement</p>
        {job.jobRequirement.map((job) => {
          return <li className="font-inter text-gray-700 mx-2 list-disc">{job}</li>;
        })}
      </div>
    </div>
  );
}
