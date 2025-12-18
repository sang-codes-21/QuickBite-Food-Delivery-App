import React, { useState } from "react";
import heroImage from "../../assets/curry.png";

const Banner = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      // Scroll to results
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mt-20 px-6 md:px-16 lg:px-24 min-h-[70vh] md:min-h-[80vh] flex items-center w-full overflow-hidden">
      <img
        src={heroImage}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-white pointer-events-none"></div>

      <div className="relative max-w-xl md:max-w-2xl flex flex-col gap-6 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg">
          छिटो मिठो <span className="text-red-400">Quick Bite</span>
        </h1>

        <p className="text-sm md:text-base text-gray-100/90 max-w-lg">
          Discover your favorite meals from the best restaurants around you.
          Order in a few taps and enjoy fast, reliable delivery.
        </p>

        <div className="mt-2">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row  gap-3 bg-white/90 rounded-2xl sm:rounded-full shadow-xl p-2 sm:p-2.5 backdrop-blur-md">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for dishes..."
              className="flex-1 px-4  rounded-xl sm:rounded-full focus:outline-none text-gray-800 placeholder:text-gray-400 bg-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl sm:rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-red-600 hover:to-rose-600 transition text-sm"
            >
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-100/90">
            <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
              30 min avg delivery
            </span>
            <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
              Live order tracking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
