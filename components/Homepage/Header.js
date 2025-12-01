"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaHome, FaTools, FaFileAlt, FaUserCircle } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { MdDashboard, MdMenuOpen } from "react-icons/md";
import { SiHtmlacademy } from "react-icons/si";
import { GoSignOut, GoQuestion } from "react-icons/go";
import { IoSettingsOutline, IoNotifications } from "react-icons/io5";
import { CiSaveDown2, CiBellOn } from "react-icons/ci";

// Header
export default function Header() {
  // States
  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const [Notification, setNotification] = useState([]);
  const [notifyDialog, setNotifyDialog] = useState(false);
  const [user, setUser] = useState({ name: "", role: "" }); // get Data from Login to store State
  const [loginTime, setLoginTime] = useState(null);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const userRef = useRef();
  const router = useRouter();
  const pathName = usePathname();

  // UseEffect

  // Fetch User Data from Login Page
  useEffect(() => {
    fetchUser();
  }, []);

  // get Notifications
  useEffect(() => {
    const stored = localStorage.getItem("notification");
    const notiftArray = stored ? JSON.parse(stored) : [];
    setNotification(notiftArray);
    setLoginTime(Date.now());
    console.log(notiftArray);
    console.log(Notification);
  }, []);

  // Read As Mark so Always Update when Change Notification
  useEffect(() => {
    setUnreadCount(Notification.filter((n) => !n.read).length);
  }, [Notification]);

  // useEffect() use by close by dialog box
  useEffect(() => {
    function handleUser(e) {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setOpen(false);
        setNotifyDialog(false);
      }
    }
    document.addEventListener("mousedown", handleUser);
    return () => {
      document.removeEventListener("mousedown", handleUser);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // USEffect For Login
  useEffect(() => {
    if (!loginTime) return;

    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - loginTime) / 60000); // ms → mins
      setElapsedMinutes(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [loginTime]);

  // To fetch Data from Login By Using GET
  const fetchUser = async () => {
    const response = await fetch("api/user", {
      method: "GET",
    });
    if (response.status === 401) {
      return router.push("/login");
    }
    const data = await response.json();
    if (!data.error) {
      return setUser(data);
    }
  };

  // HandleDelete
  function handleDelete(id) {
    setNotification((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("notification", JSON.stringify(updated));
      return updated;
    });
  }

  // User Profile
  function handleUser() {
    setNotifyDialog(false);
    setOpen(true);
  }

  // Notify Dialog
  function handleNotify() {
    setOpen(false);
    setNotifyDialog(true);
  }

  // Mark All Read

  function MarkAllRead() {
    const updated = Notification.map((item) => ({ ...item, read: true }));
    setNotification(updated);
    localStorage.setItem("notification", JSON.stringify(updated));
  }

  // ReadAsMark
  function ReadAsMark(id) {
    const updated = Notification.map((prev) => (prev.id === id ? { ...prev, read: true } : prev));
    setNotification(updated);
    localStorage.setItem("notification", JSON.stringify(updated));
  }

  // Logout Session by Using POST
  const handleLogout = async () => {
    const response = await fetch("api/Logout", {
      method: "POST",
    });
    if (response.status === 204) {
      localStorage.removeItem("notification");
      setNotification([]);
      return router.push("/login");
    }
  };

  return (
    <>
      {/* 🔹 Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between pr-6 z-50 items-center bg-white  p-2 py-3  border-b border-[#ccccc9]">
        <div className="flex space-x-2 items-center">
          {/* Sidebar Toggle Icon */}
          <span className="pl-2 pr-4">
            {sidebar ? (
              <MdMenuOpen
                className="w-7 h-7 cursor-pointer text-gray-800"
                onClick={() => setSidebar(!sidebar)}
              />
            ) : (
              <IoMdMenu
                className="w-7 h-7 cursor-pointer text-gray-800"
                onClick={() => setSidebar(!sidebar)}
              />
            )}
          </span>
          <Link
            href="/"
            className="text-xl tablet:text-2xl font-bold uppercase font-inter flex items-center gap-1 hover:scale-105 transition-transform duration-300"
          >
            <span className="text-gray-800">
              Job
              <span className="text-blue-600">Finder</span>
            </span>
          </Link>
        </div>

        <div className="flex  items-center space-x-6">
          {/* bell icon */}
          <div className="relative  ">
            {unreadCount > 0 ? (
              <div className="w-4 flex justify-center items-center animate-pulse text-white h-4 bg-red-500 rounded-full p-1 absolute right-0 top-[-5px] text-sm font-semibold">
                {unreadCount}
              </div>
            ) : (
              <></>
            )}
            <CiBellOn onClick={handleNotify} className="h-7 w-7 font-bold cursor-pointer" />

            {notifyDialog && (
              <div
                ref={userRef}
                className=" absolute top-64 small:-translate-x-[68%] tablet:-translate-x-[80%] -translate-y-1/2 bg-white shadow-lg rounded-lg font-inter small:w-[300px] tablet:w-[320px] h-[440px]  "
              >
                {/* <div className="relative"></div> */}
                {/* Heading */}
                <div className="flex p-2 justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tl-lg rounded-tr-lg">
                  <h1 className="text-lg font-semibold font-inter">Notification</h1>
                  <button onClick={MarkAllRead} className="text-xs font-sans">
                    Mark all read
                  </button>
                </div>

                {Notification.length == 0 && (
                  <>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 ">
                      <div className="relative my-6">
                        <IoNotifications className="w-12 h-12 mx-auto" />
                        <p className="text-base my-2 font-inter text-center font-semibold">
                          No Notification
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="h-[360px] overflow-y-scroll">
                  {/* -------------------------------------------------- */}
                  {Notification.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className={` ${
                          item.read ? "bg-white" : "bg-blue-50 "
                        }   border border-t-0 border-l-0 border-r-0 border-b-gray-200 py-4 `}
                      >
                        <div className="flex ">
                          <span className="px-2 ">
                            <Image
                              src={item.Image || null}
                              width={26}
                              height={26}
                              priority
                              quality={100}
                              alt="Img"
                              className="w-7 h-7 object-contain"
                            />
                          </span>
                          <span>
                            <p className="font-semibold font-inter pb-1 w-56 pl-[6px]  text-black">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500 w-56 font-sans pl-[6px]">
                              {item.message}
                            </p>
                          </span>
                          <span className="flex justify-end  w-12 py-1 mr-1 pr-1">
                            <IoMdClose
                              onClick={() => {
                                handleDelete(item.id);
                              }}
                              className="text-black"
                            />
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 mt-1">
                          <p className="text-gray-500 text-sm pl-[43px] font-sans ">
                            {elapsedMinutes === 0
                              ? "Just now"
                              : `${elapsedMinutes} min${elapsedMinutes > 1 ? "s" : ""} ago`}
                          </p>
                          <button
                            onClick={() => {
                              ReadAsMark(item.id);
                            }}
                            className={` text-blue-600 cursor-pointer text-xs px-[6px] font-sans flex justify-end  font-semibold`}
                          >
                            {item.read ? "" : "Read as Mark"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ----------------------------------------------- */}

                {/* View All  */}
                <div
                  className={`${
                    Notification.length === 0 ? "my-3" : "my-1"
                  } absolute bottom-0 translate-x-1/2 `}
                >
                  <button className=" my-1 text-base font-sans text-blue-600 font-semibold mx-auto">
                    View all Notification
                  </button>
                </div>
                {/* view all End */}
              </div>
            )}
          </div>
          {/* End Bell Icon */}

          {/* User Icon */}
          <div className="relativ flex items-center">
            {/* handle User */}
            <div
              onClick={handleUser}
              className="e w-8 h-8 rounded-full bg-gradient-to-r from-[#6b74df] to-[#4a50c4] flex justify-center items-center shadow-md cursor-pointer"
            >
              <p className="text-base font-inter capitalize font-bold text-white">
                {user?.name ? user.name.slice(0, 1) : "G"}
              </p>

              {/* Login Profile */}

              {open && (
                <div
                  ref={userRef}
                  className=" absolute top-49 small:-translate-x-1/3 tablet:-translate-x-[38%] -translate-y-1/2 bg-white shadow-lg rounded-md  py-1 font-inter small:w-[190px] tablet:w-[220px]"
                >
                  <div className="p-3 px-4">
                    <p className="text-base font-inter font-semibold">{user.name}</p>
                    <p className="text-xs relative text-gray-400 ">{user.role}</p>
                  </div>
                  <div className="h-[1px] bg-slate-200 my-1"></div>
                  <div className="p-3 px-4 text-gray-500 list-none text-sm font-inter font-[300] space-y-4">
                    <li>
                      <Link href="" className="flex items-center space-x-4 hover:text-blue-400">
                        {" "}
                        <span className="mr-2">
                          <FaUserCircle className="w-5 h-5 text-slate-400  hover:text-blue-400" />
                        </span>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="" className="flex items-center space-x-4  hover:text-blue-400">
                        <span className="mr-2">
                          <IoSettingsOutline className="w-5 h-5 text-slate-400  hover:text-blue-400" />
                        </span>
                        Settings
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link href="" className="flex items-center space-x-4  hover:text-blue-400">
                        <span className="mr-2">
                          <CiSaveDown2 className="w-5 h-5 text-slate-400  hover:text-blue-400" />
                        </span>
                        Saved items
                      </Link>
                    </li>
                    <li>
                      <Link href="" className="flex items-center space-x-4  hover:text-blue-400">
                        <span className="mr-2">
                          <GoQuestion className="w-5 h-5 text-slate-400  hover:text-blue-400" />
                        </span>
                        Help & Support
                      </Link>
                    </li>
                  </div>
                  <div className="h-[1px] bg-slate-200 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="text-red-700 cursor-pointer flex items-center p-3 px-4 hover:text-red-500"
                  >
                    <GoSignOut className="mr-3 ml-1" />
                    Sign Out
                  </button>
                </div>
              )}

              {/* End Login Profile */}
            </div>
            {/* end Handle User */}
          </div>
        </div>
      </nav>

      {/* 🔹 Sidebar Menu */}
      <nav
        className={`fixed top-0 left-0 h-screen  bg-[#fdfdfd] z-40 text-white transition-all duration-300 ease-in-out font-semibold text-lg ${
          sidebar ? "w-[300px] p-4" : "w-[64px] p-[10px]"
        }`}
      >
        <ul className="mt-20 grid gap-y-10">
          <li
            className={` ${
              pathName === "/" && sidebar ? "bg-[#f0f0f0] text-white " : " text-[#222222] "
            } flex items-center space-x-4 rounded-md p-2`}
          >
            <Link href="/">
              <FaHome className="w-6 h-6 text-[#3f3f3f]" />
            </Link>
            {sidebar && (
              <Link
                href="/"
                className=" text-[#222222]"
                onClick={() => {
                  setSidebar(false);
                }}
              >
                Home
              </Link>
            )}
          </li>
          <li
            className={` ${
              pathName === "/dashboard" && sidebar ? "bg-[#f0f0f0] text-white  " : " text-[#222222] `"
            } flex items-center space-x-4 rounded-md p-2`}
          >
            <Link href="/dashboard">
              {" "}
              <MdDashboard className="w-6 h-6 text-[#3f3f3f]" />
            </Link>
            {sidebar && (
              <Link
                href="/dashboard"
                className=" text-[#222222]"
                onClick={() => {
                  setSidebar(false);
                }}
              >
                Dashboard
              </Link>
            )}
          </li>
          <li
            className={` ${
              pathName === "/jobs" && sidebar ? "bg-[#f0f0f0] " : " text-[#222222]"
            } flex items-center space-x-4 rounded-md p-2`}
          >
            <Link href="/jobs">
              {" "}
              <FaTools className="w-6 h-6 text-[#3f3f3f]" />
            </Link>
            {sidebar && (
              <Link
                href="/jobs"
                className="text-[#222222]"
                onClick={() => {
                  setSidebar(false);
                }}
              >
                Jobs
              </Link>
            )}
          </li>
          <li
            className={` ${
              pathName === "/resume" && sidebar ? "bg-[#f0f0f0] " : " text-[#222222]"
            } flex items-center space-x-4 rounded-md p-2`}
          >
            <Link href="/resume">
              {" "}
              <FaFileAlt className="w-6 h-6 text-[#3f3f3f]" />
            </Link>
            {sidebar && (
              <Link
                href="/resume"
                className="text-[#222222]"
                onClick={() => {
                  setSidebar(false);
                }}
              >
                Build Resume
              </Link>
            )}
          </li>
          <li
            className={` ${
              pathName === "/academy" && sidebar ? "bg-[#f0f0f0]  " : " text-[#222222]"
            } flex items-center space-x-4 rounded-md p-2`}
          >
            <Link href="/academy">
              {" "}
              <SiHtmlacademy className="w-6 h-6 text-[#3f3f3f]" />
            </Link>
            {sidebar && (
              <Link
                href="/academy"
                className="text-[#222222]"
                onClick={() => {
                  setSidebar(false);
                }}
              >
                Academy
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
