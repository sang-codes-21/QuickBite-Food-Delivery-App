import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { images } from "../../data/home/Heroimages.jsx";
const Hero = ({ onSearch }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [hovered, sethovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      // Scroll to results
      window.scrollTo({ top: 800, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-20 min-h-[600px] flex flex-col md:flex-row items-center px-6 md:px-16 lg:px-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          background: "linear-gradient(to right, #facfcff9, #ff0303ff)",
          filter: "blur(4px)",

          opacity: 0.2,
          zIndex: -1,
        }}
      ></div>

      <div className=" md:w-[50%] mt-10  md:ml-16">
        <h1 className="text-6xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          छिटो मिठो{" "}
          <span className=" bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
            Quick Bite
          </span>
        </h1>

        <p className="text-base md:text-lg mt-10 text-gray-600 leading-relaxed max-w-lg">
          Discover your favorite meals from the best restaurants around you.
          Order in a few taps and enjoy fast, reliable delivery.
        </p>

        <div className="mt-10 md:w-[80%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col  sm:flex-row gap-3  rounded-2xl sm:rounded-full shadow-2xl p-2 border border-gray-100"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for dishes..."
              className="flex-1 px-6 py-2 rounded-xl sm:rounded-full text-gray-800 placeholder:text-gray-400 focus:outline-none "
            />
            <button
              type="submit"
              className="px-8 py-1 rounded-xl sm:rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-red-600 hover:to-rose-600 transition-all "
            >
              Search
            </button>
          </form>

          <div className=" flex p-4 flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1  rounded-full bg-orange-400  border border-orange-500/40 text-white font-bold shadow-md">
              30 min avg delivery
            </span>
            <span className="px-3 py-1 rounded-full bg-red-600/80  border border-red-700/40 text-white font-bold shadow-md">
              Live order tracking
            </span>
          </div>
        </div>
      </div>

      <motion.div
        className=" flex flex-wrap mt-12 md:mt-14 md:w-[50%]"
        onHoverStart={() => sethovered(true)}
        onHoverEnd={() => sethovered(false)}
      >
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img.src}
            alt={img.alt}
            className={`rounded-lg md:rounded-2xl ${img.className}`}
            animate={
              isMobile
                ? { x: img.mx || img.x, y: img.my }
                : {
                    x: hovered ? img.x : img.initx,
                    y: hovered ? img.y : img.inity,
                  }
            }
            transition={{
              type: "easeInOut",
              stiffness: 200,
              duration: 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
