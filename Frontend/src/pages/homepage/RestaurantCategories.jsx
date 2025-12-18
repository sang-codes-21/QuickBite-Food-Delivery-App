import React, { useState, useEffect } from "react";
import TextFormat from "../../components/TextFormat.jsx";
import restaurantSpots from "../../data/Restaurant.js";

const RestaurantCategories = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(restaurantSpots.length / itemsPerPage);

  const visibleItems = restaurantSpots.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const goToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  return (
    <div className="mt-8">
      <TextFormat
        as="h1"
        className="font-semibold text-gray-900 text-lg md:text-xl"
      >
        Most Popular Restaurants
      </TextFormat>

      <div className="relative w-full mt-4">
        <div className="flex justify-center gap-4">
          {visibleItems.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-start text-left text-gray-900 bg-white/95 px-3 py-3 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 hover:shadow-lg transition duration-300 shrink-0 w-[190px] md:w-[220px]"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-[120px] md:h-[160px] object-cover rounded-xl mb-2"
              />
              <div className="w-full">
                <TextFormat
                  as="p"
                  size="xs"
                  className="text-sm font-semibold text-gray-900 line-clamp-2"
                >
                  {category.name}
                </TextFormat>
                <p className="text-[11px] md:text-xs text-gray-500 mt-1 line-clamp-2">
                  {category.location}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentPage === index
                  ? "w-6 bg-red-500"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCategories;




