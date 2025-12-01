"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { Notification } from "../../../data/Notification";
// Login

function Login() {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (password.length < 7) {
      alert("Password must be 8 Character");
      return;
    }

    const response = await fetch("/api/login", {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log("response", response);
    if (response.status === 401) {
      alert("InCorrect Password");
      return router.push("/login");
    }
    const data = await response.json();
    if (!data.error) {
      localStorage.setItem("notification", JSON.stringify(Notification));

      return router.push("/");
    }
  };

  return (
    <div className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 small:w-[280px] medium:w-[340px] tablet:w-[400px] desktop:w-[420px] rounded-md bg-white shadow-2xl small:p-4 desktop:p-4 py-6">
      <div className="text-lg font-inter font-semibold small:mb-2 tablet:mb-4 text-blue-400">
        <p className=" font-inter text-2xl font-semibold">Log In</p>
      </div>
      <form
        onSubmit={handlesubmit}
        className="font-inter small:py-4 desktop:py-6 flex flex-col"
      >
        <label htmlFor="foremail" className="my-1 font-semibold">
          Email Address
        </label>
        <input
          type="email"
          name="foremail"
          id="foremail"
          className="border border-gray-400 outline-none p-1 focus:border-blue-500"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="name" className="my-1 font-semibold">
          Password
        </label>

        <div className="relative ">
          <input
            type={visible ? "text" : "password"}
            name="name"
            id="name"
            className="border border-gray-400 outline-none p-1 focus:border-blue-500 w-full"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              setVisible(!visible);
            }}
            aria-label={visible ? "Hide password" : "Show Password"}
            className={` ${
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
        <br />
        <button
          type="submit"
          className="bg-blue-400 text-white rounded-md p-1 text-lg"
        >
          Login
        </button>
      </form>
      <div className="my-2">
        <span className="flex items-center space-x-1 justify-center">
          <p className="font-inter font-[500] small:text-sm medium:text-base">
            Don't have an Account?
          </p>
          <Link
            href="/register"
            className="text-blue-400 font-inter small:text-sm medium:text-base"
          >
            Register
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
