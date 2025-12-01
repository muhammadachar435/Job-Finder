"use client";

import React, { useEffect, useState } from "react";
import { NewsLetterHedaing } from "./Heading";
import Confetti from "react-confetti";
import { FaEnvelopeOpenText, FaPaperPlane } from "react-icons/fa";

function NewsLetter() {
  const [emailSubscribe, setEmailsubscribe] = useState("");
  const [user, setUser] = useState({ _id: "" });
  const [subscribed, setSubscribed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await fetch("/api/subscribe", { method: "GET" });
    if (response.status === 401) return;
    const data = await response.json();
    if (!data.error) setUser(data);
  };

  const handleSubscribe = async () => {
    if (!emailSubscribe) return alert("Please enter your email");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailSubscribe, subUid: user._id }),
      });

      if (response.status === 200) {
        setEmailsubscribe("");
        setSubscribed(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } else if (response.status === 409) {
        alert("Email already exists");
        setEmailsubscribe("");
      } else {
        alert("Subscription failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="px-6 py-10 text-center relative overflow-hidden">
      {showConfetti && <Confetti numberOfPieces={250} recycle={false} />}

      {!subscribed ? (
        <div className="flex flex-col items-center gap-6 mt-0">
          {/* Attractive title & subtitle */}
          <NewsLetterHedaing />

          {/* Input & Button with icon and animation */}
          <div className="flex justify-center items-center gap-2 animate-fadeIn delay-300">
            <input
              type="email"
              placeholder="Enter your email"
              value={emailSubscribe}
              onChange={(e) => setEmailsubscribe(e.target.value)}
              className="border border-gray-300 rounded-l-md px-4 py-3 small:w-34 medium:w-46 large:w-54 tablet:w-76 desktop:w-82 widescreen:w-88 outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition duration-300 ease-in-out hover:scale-105"
            />
            <button
              onClick={handleSubscribe}
              className="bg-purple-600 text-white small:px-1 medium:px-2 tablet:px-6 widescreen:px-8 py-3 rounded-r-md hover:bg-purple-700 shadow-lg transition-transform transform hover:scale-110 flex items-center cursor-pointer gap-2"
            >
              <FaPaperPlane /> Subscribe
            </button>
          </div>

          {/* Small animated text */}
          <p className="text-gray-900 text-sm mt-2 animate-pulse">No spam. Unsubscribe anytime.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-6 animate-fadeIn">
          <FaEnvelopeOpenText className="text-6xl text-green-600 animate-bounce" />
          <p className="text-green-700 text-2xl font-bold">Thank you for subscribing!</p>
          <p className="text-gray-600">Check your inbox for confirmation.</p>
        </div>
      )}
    </section>
  );
}

export default NewsLetter;
