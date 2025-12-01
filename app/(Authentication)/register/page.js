"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

// Register
export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    experience: "",
    location: "",
    jobType: "",
  });

  const { name, email, password, confirmPassword, role, experience, location, jobType } = formData;

  // visible Password
  const [visible, setVisible] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword, role, experience, location, jobType);
    if (formData.password.length < 7 && formData.confirmPassword.length < 7) {
      alert("Password must be 8 Character");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert(" Passwords do not match!");
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        role,
        experience,
        location,
        jobType,
      }),
    });
    console.log("Response", response);
    const data = await response.json();
    console.log(data);
    if (!data.error) {
      return router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center tablet:h-screen  bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md small:mt-6 tablet:mt-0 w-full  small:max-w-[280px] medium:max-w-[340px] large:max-w-[380px] tablet:max-w-[600px] desktop:max-w-[800px]"
      >
        <h2 className="text-2xl font-bold text-blue-500 mb-10 font-inter">Create Your Job Profile</h2>

        {/* Grid layout for 2 fields in one row (on tablet+) */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 small:gap-4 tablet:gap-8">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md w-full outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => {
                setVisible(!visible);
              }}
              aria-label={visible ? "Hide password" : "Show Password"}
              className={`${
                password.length > 0 ? "text-black" : "text-gray-400"
              } absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2 outline-none `}
            >
              {visible ? (
                <>
                  <RxEyeOpen />
                </>
              ) : (
                <>
                  <GoEyeClosed />
                </>
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            required
          />

          {/* role */}
          <input
            type="text"
            name="role"
            placeholder="Enter your role (e.g., Web Developer)"
            value={formData.role}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />

          {/* Experience Level */}
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className={`${
              formData.experience === "" ? "text-gray-400" : "text- text-black"
            } border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
          >
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location (e.g. Karachi)"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-400 p-2 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />

          {/* Preferred Job Type */}
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className={`${
              formData.jobType === "" ? "text-gray-400" : "text- text-black"
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
            className="outline-none  w-full text-center  cursor-pointer font-bold bg-green-500 text-base text-white py-2 rounded-md hover:duration-300 transition-all"
          >
            Register
          </button>
        </div>
        <Link href="/login" className="outline-none mt-6 text-inter flex justify-center text-blue-400">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
