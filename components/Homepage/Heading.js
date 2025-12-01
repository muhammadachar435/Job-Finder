"use client";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { fadeIn } from "../AnimationMotion/variants"; // Import FadeIn from Variant JSX File

export function ExploreHeading() {
  return (
    <>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Explore Job Categories */}
        <h3 className="small:text-2xl large:text-[26px] tablet:text-4xl desktop:text-5xl font-bold text-center mb-3 font-inter text-gray-800">
          Explore Job Categories
        </h3>
        <p className="text-center text-gray-600 mb-10 font-inter small:text-sm tablet:text-base">
          Find your ideal job from a variety of categories and industries
        </p>
      </motion.div>
    </>
  );
}

export function FeaturesHeading() {
  return (
    <>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h3 className="small:text-2xl large:text-[26px] tablet:text-4xl desktop:text-5xl font-bold text-center mb-3 font-inter text-gray-800">
          Featured Job Opening
        </h3>
        <p className="text-center text-gray-600 mb-10 font-inter small:text-sm tablet:text-base">
          Explore top job opportunities handpicked for you.
        </p>
      </motion.div>
    </>
  );
}
export function TestimonialHedaing() {
  return (
    <>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h3 className="small:text-2xl large:text-[26px] tablet:text-4xl desktop:text-5xl font-bold text-center mb-3 font-inter text-gray-800">
          What Our Users Say
        </h3>
        <p className="text-center text-gray-600 mb-10 font-inter small:text-sm tablet:text-base">
          Hear from professionals who found career success through our platform.
        </p>
      </motion.div>
    </>
  );
}

export function NewsLetterHedaing() {
  return (
    <>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h3 className="small:text-2xl large:text-[26px] tablet:text-4xl desktop:text-5xl font-bold text-center mb-3 font-inter text-gray-800">
          Level Up Your Career!
        </h3>
        <p className="text-center text-gray-600 mb-10 font-inter small:text-sm tablet:text-base">
          Stay ahead with the newest job opportunities, expert career tips, and exclusive
          perks—right in your inbox.
        </p>
      </motion.div>
    </>
  );
}
