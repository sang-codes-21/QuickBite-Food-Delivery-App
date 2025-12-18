import React from "react";
import TextFormat from "../../components/TextFormat.jsx";

const CategoriesSection = ({ categories, selectedCuisine, onSelect }) => {
  return (
    <div className="mt-10 pb-4">
    
      <div className="flex items-center justify-between gap-2 mb-3">
        <TextFormat
          as="h1"
          className="text-lg md:text-xl font-semibold text-gray-900"
        >
          Categories
        </TextFormat>
        <p className="text-xs md:text-sm text-gray-500">
          Tap to explore different cuisines
        </p>
      </div>

      <div className="w-full h-[170px] gap-4 flex justify-center overflow-x-auto no-scrollbar bg-white/80 rounded-2xl border border-gray-100 shadow-sm px-3 py-3 backdrop-blur">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelect(category.name)}
            className={`flex flex-col items-center px-3 py-2 transition duration-300 shrink-0 rounded-2xl ${
              selectedCuisine === category.name
                ? "bg-red-50 border border-red-200 shadow-md"
                : "bg-white/90 border border-gray-100 shadow-sm hover:border-red-200  hover:text-red-500 hover:shadow-md"
            }`}
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-2 border-2 border-red-400"
            />
            <TextFormat
              as="p"
              size="xs"
              className={`mt-0 ${
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
  );
};

export default CategoriesSection;
