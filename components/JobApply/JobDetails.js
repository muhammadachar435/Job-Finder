"use client";
import { useState } from "react";
import Model from "../UIModel/Model";

function JobDetails({ close, setClose }) {
  const [formData, setFormData] = useState({
    ApplicantName: "",
    ApplicantEmail: "",
    ApplicantRole: "",
    ApplicantExperience: "",
    ApplicantJobType: "",
  });

  const { ApplicantName, ApplicantEmail, ApplicantRole, ApplicantExperience, ApplicantJobType } =
    formData;

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const JobSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/jobApplicant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ApplicantName,
        ApplicantEmail,
        ApplicantRole,
        ApplicantExperience,
        ApplicantJobType,
      }),
    });
    if (response.status === 201) {
      setClose(false);
    }
    if (response.status === 404) {
      alert("Already submit form this Email");
    }
    console.log("Response", response);
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      {close && (
        <Model closeup={() => setClose(false)}>
          <div>
            <form
              onSubmit={JobSubmit}
              className=" small:p-3 tablet:p-6 small:mt-6 tablet:mt-0 w-full  small:max-w-[280px] medium:max-w-[340px] large:max-w-[380px] tablet:max-w-[600px] desktop:max-w-[800px]"
            >
              <h2 className="text-2xl font-bold text-blue-500 mb-10 font-inter">Job Application Form</h2>

              {/* Grid layout for 2 fields in one row (on tablet+) */}
              <div className="grid grid-cols-1 tablet:grid-cols-2 small:gap-2 tablet:gap-8">
                {/* Applicant Name */}
                <input
                  type="text"
                  name="ApplicantName"
                  placeholder="Full Name"
                  value={formData.ApplicantName}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />

                {/* Email */}
                <input
                  type="email"
                  name="ApplicantEmail"
                  placeholder="Email Address"
                  value={formData.ApplicantEmail}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />

                {/* role */}
                <input
                  type="text"
                  name="ApplicantRole"
                  placeholder="Enter your role (e.g., Web Developer)"
                  value={formData.ApplicantRole}
                  onChange={handleChange}
                  className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />

                {/* Experience Level */}
                <select
                  name="ApplicantExperience"
                  value={formData.ApplicantExperience}
                  onChange={handleChange}
                  className={`${
                    formData.ApplicantExperience === "" ? "text-gray-400" : "text- text-black"
                  } border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                >
                  <option value="">Select Experience Level</option>
                  <option value="6 Month">6 Month </option>
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="3 Year Above">3 Year Above</option>
                </select>

                {/* Preferred Job Type */}
                <select
                  name="ApplicantJobType"
                  value={formData.ApplicantJobType}
                  onChange={handleChange}
                  className={`${
                    formData.ApplicantJobType === "" ? "text-gray-400" : "text- text-black"
                  } border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                >
                  <option value="">Select Preferred Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center my-6">
                <button
                  type="submit"
                  className="outline-none  w-[200px] text-center  cursor-pointer font-bold bg-green-500 text-base text-white py-2 rounded-md hover:duration-300 transition-all"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </Model>
      )}{" "}
    </>
  );
}

export default JobDetails;
