"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseSharp } from "react-icons/io5";

export default function Model({ children, closeup }) {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    // Runs only on client-side
    const element = document.getElementById("portal-root");
    setPortalElement(element);
    setMounted(true);
  }, []);

  if (!mounted || !portalElement) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-opacity-50 z-40"
        style={{ background: "rgba(0, 0, 0, 0.6)" }}
        onClick={closeup}
      ></div>

      {/* Modal Content */}
      <div className="z-[9999] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-2xl shadow-lg w-full small:max-w-[300px] tablet:max-w-[640px] ">
        {/* Close Button */}
        <button
          onClick={closeup}
          className="absolute top-3 right-3 z-50 cursor-pointer font-bold text-black rounded"
        >
          <IoCloseSharp className="w-7 h-7" />
        </button>

        {/* Fancy Blur Circles */}
        <div className="w-[70px] h-[70px] absolute top-0 left-0 bg-[#d7c0f3] blur-[35px] rounded-full shadow-2xl"></div>
        <div className="w-[70px] h-[70px] absolute top-0 right-0 bg-[#d7c0f3] blur-[50px] rounded-full shadow-2xl"></div>
        <div className="w-[70px] h-[70px] absolute bottom-0 left-0 bg-[#d7c0f3] blur-[35px] rounded-full shadow-2xl"></div>
        <div className="w-[70px] h-[70px] absolute bottom-0 right-0 bg-[#d7c0f3] blur-[35px] rounded-full shadow-2xl"></div>

        {children}
      </div>
    </>,
    portalElement
  );
}
