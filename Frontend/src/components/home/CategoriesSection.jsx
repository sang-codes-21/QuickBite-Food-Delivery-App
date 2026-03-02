import React from "react";
import TextFormat from "../constant/TextFormat.jsx";

const CategoriesSection = ({ categories, selectedCuisine, onSelect }) => {
  return (
    <div className="mt-6 sm:mt-8 md:mt-10 pb-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <TextFormat
          as="h1"
          className="text-base sm:text-lg md:text-xl font-semibold text-gray-900"
        >
          Categories
        </TextFormat>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">
          Tap to explore different cuisines
        </p>
      </div>

      {/* Mobile: horizontal scroll | Tablet+: wrapping grid */}
      <div className="w-full bg-white/80 rounded-2xl border border-gray-100 shadow-sm px-2 sm:px-3 py-3 backdrop-blur">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 sm:overflow-x-visible">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelect(category.name)}
              className={`flex flex-col items-center min-w-[80px] sm:min-w-0 px-2 sm:px-3 py-2 transition duration-300 shrink-0 sm:shrink rounded-2xl ${
                selectedCuisine === category.name
                  ? "bg-red-50 border border-red-200 shadow-md"
                  : "bg-white/90 border border-gray-100 shadow-sm hover:border-red-200 hover:text-red-500 hover:shadow-md"
              }`}
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover mb-1.5 sm:mb-2 border-2 border-red-400"
              />
              <TextFormat
                as="p"
                size="xs"
                className={`mt-0 text-[10px] sm:text-xs ${
                  selectedCuisine === category.name
                    ? "text-red-500 font-semibold"
                    : " "
                }`}
              >
                {category.name}
              </TextFormat>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
