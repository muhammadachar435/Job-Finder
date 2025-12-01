"use client";

export function Searchbar() {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden small:w-[220px] medium:w-[280px] tablet:w-[300px] desktop:w-[380px] mac:w-[440px] mb-6 ">
      <input
        type="text"
        placeholder="Search jobs or companies..."
        className="flex-grow px-4 py-3 outline-none small:w-[160px] large:w-full"
      />
      <button className="bg-blue-600 text-white small:px-2 tablet:px-6 font-inter font-semibold cursor-pointer hover:bg-blue-700 transition ">
        Search
      </button>
    </div>
  );
}
