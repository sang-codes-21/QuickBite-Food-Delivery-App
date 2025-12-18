import { useState, useEffect, useCallback } from "react";

import { FetchAllCuisines } from "../ServerAPI.js";

import RestaurantCategories from "../pages/homepage/RestaurantCategories.jsx";
import country from "../data/cuisines.js";

import delivery from "../assets/delivery.gif";
import CategoriesSection from "../pages/homepage/CategoriesSection.jsx";
import MostPopularSection from "../pages/homepage/MostPopularSection.jsx";

const ApiDisplay = ({
  setCartCount,
  searchQuery,
  setSearchQuery,
  setFavCount,
}) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const handleClick = useCallback(async (cuisine) => {
    setLoading(true);
    setSelectedCuisine(cuisine);

    try {
      const data = await FetchAllCuisines(cuisine);

      setFoods(data);
    } catch (error) {
      console.error("Error fetching cuisines:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleClick("All");
  }, [handleClick]);

  let filteredFoods = foods;

  if (searchQuery) {
    filteredFoods = foods.filter((food) => {
      const title = food.title?.toLowerCase() || "";
      const search = searchQuery.toLowerCase();

      return title.includes(search);
    });
  }

  return (
    <div className="mt-10 pb-24">
      {searchQuery && !loading && (
        <MostPopularSection
          foods={filteredFoods}
          selectedCuisine={`Search: "${searchQuery}"`}
          setCartCount={setCartCount}
          setFavCount={setFavCount}
          clearSearch={() => {
            setSelectedCuisine("All");
            setSearchQuery("");
          }}
        />
      )}

      <CategoriesSection
        categories={country}
        selectedCuisine={selectedCuisine}
        onSelect={handleClick}
      />

      <RestaurantCategories />

      {loading && (
        <div className="text-center mt-8">
          <p className="text-gray-500">
            Loading delicious{" "}
            {selectedCuisine === "All" ? "dishes" : selectedCuisine + " food"}
            ...
          </p>
          <img src={delivery} alt="loading" className="w-32 h-32 mx-auto " />
        </div>
      )}

      {!searchQuery && !loading && (
        <MostPopularSection
          foods={filteredFoods}
          selectedCuisine={selectedCuisine}
          setCartCount={setCartCount}
          setFavCount={setFavCount}
        />
      )}
    </div>
  );
};

export default ApiDisplay;
