import Link from "next/link";
import Image from "next/image";
import { ExploreHeading, FeaturesHeading, TestimonialHedaing } from "../../components/Homepage/Heading";
import { Searchbar } from "@/components/Homepage/Searchbar";
import { categories } from "@/data/hero";
import { featuresData } from "@/data/features";
import { Testimonial } from "@/data/Testimonal";
import NewsLetter from "@/components/Homepage/NewsLetter";
import { FiArrowRight } from "react-icons/fi";

// Home Page
export default function Home() {
  return (
    <div className="ml-16 mt-14">
      {/* Hero Section */}
      <section className="flex flex-col tablet:flex-row justify-between items-center small:px-4 small:pt-6 tablet:pt-8 desktop:pt-16 desktop:px-6 mac:px-10 w-full">
        <div className="small:max-w-xl desktop:max-w-[460px] mac:max-w-[560px] ultrawide:max-w-[1200px] ">
          <h2 className="small:text-3xl medium:text-4xl desktop:text-5xl widescreen:text-6xl ultrawide:text-9xl font-extrabold text-gray-800 mb-4">
            Discover the <span className="text-blue-600">Best Jobs</span> for You
          </h2>
          <p className="text-gray-600 mb-6 font-inter mac:text-lg">
            Explore top opportunities and get hired by the best companies around the world.
          </p>

          {/* Search Bar */}
          <Searchbar />

          <div className="flex gap-4 my-4">
            <Link
              href="/login"
              prefetch={false}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/register"
              prefetch={false}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition"
            >
              Join Free
            </Link>
          </div>
        </div>

        <Image
          src="/herosectionImg.jpg"
          alt="Job Search"
          width={500}
          height={350}
          priority
          className="rounded-xl shadow-lg mt-10 tablet:mt-0 tablet:w-[300px] tablet:h-[260px] desktop:w-[450px] desktop:h-auto h-auto mac:w-[550px] widescreen:w-[600px] ultrawide:w-[1100px] mac:h-auto "
        />
      </section>

      {/* Job Categories */}

      <section className="mt-20 py-6 small:px-4 large:px-8 tablet:px-10 desktop:px-4">
        <ExploreHeading />
        <div className="grid small:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03]"
            >
              {/* Image */}
              <div className="mb-4">
                <Image
                  src={cat.img}
                  width={100}
                  height={100}
                  priority
                  alt={cat.title}
                  className="mx-auto w-[120px] h-[85px] object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Title */}
              <h4 className="font-semibold text-lg text-gray-800 mb-1 font-inter">{cat.title}</h4>

              {/* Jobs Count */}
              <p className="text-gray-600 text-sm font-inter">{cat.jobs}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}

      <section className="px-10 py-6 small:mt-4 tablet:mt-10 ">
        {/* Heading */}
        <FeaturesHeading />

        {/* boxes */}
        <div className="grid small:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 mac:grid-cols-4 small:gap-8 mac:gap-6 ultrawide:w-[1450px] ultrawide:mx-auto">
          {featuresData.map((job, i) => (
            <div
              key={i}
              className={`${job.bgColor} ${job.textColor} shadow-lg p-6 rounded-xl hover:shadow-2xl transition-transform hover:scale-105 duration-300`}
            >
              {/* Badge */}
              <span className="inline-block bg-white/70 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                {job.badge}
              </span>

              {/* Title */}
              <h4 className="font-bold text-lg mt-3 mb-2 font-inter">{job.title}</h4>

              {/* Short Description */}
              <p className="text-sm font-inter mb-3">{job.description}</p>

              {/* Company & Location */}
              <p className="font-inter text-sm">
                {job.company} • {job.location}
              </p>

              {/* Salary */}
              <p className={`font-semibold mt-2 font-inter ${job.salaryColor}`}>{job.salary}</p>

              {/* Button */}
              <Link
                href="/jobs"
                className={`mt-5 ${job.btnColor} w-[155px] font-inter cursor-pointer text-white px-6 py-2 rounded-md hover:shadow-md transition duration-300 flex items-center gap-2`}
              >
                Apply Now <FiArrowRight className="text-sm cursor-pointer" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <TestimonialHedaing />

        <div className="grid small:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {Testimonial.map((t, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-300"
            >
              {/* Quote Icon */}
              <div className="text-blue-500 text-5xl mb-4 opacity-80">“</div>

              {/* Description */}
              <p className="text-gray-700 text-base leading-relaxed mb-6 italic font-medium">{t.text}</p>

              {/* Profile Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                  <p className="text-gray-500 text-sm font-medium">{t.role}</p>
                </div>

                <Image
                  src={t.img}
                  alt={t.name}
                  width={60}
                  height={60}
                  className="w-14 h-14 rounded-full object-cover shadow-md"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <NewsLetter />
    </div>
  );
}
