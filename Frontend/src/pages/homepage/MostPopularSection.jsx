import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddToFav } from "../../ServerAPI.js";
import TextFormat from "../../components/TextFormat.jsx";
import toast from "react-hot-toast";
import AddToCart from "../../components/AddToCart.jsx";
const MostPopularSection = ({
  foods,
  selectedCuisine,
  setCartCount,
  clearSearch,
  setFavCount,
}) => {
  const navigate = useNavigate();
  const [addingToFavId, setAddingToFavId] = useState(null);

  const isSearching = selectedCuisine.startsWith("Search:");

  if (!foods || foods.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-8">
        No {selectedCuisine} items found. Try a different cuisine!
      </p>
    );
  }
  return (
    <div>
      <div className="mt-10 flex items-center justify-between">
        <TextFormat
          as="h1"
          className="text-lg md:text-xl text-gray-900 font-semibold"
        >
          {selectedCuisine === "All"
            ? "Most Popular Dishes"
            : `Searched Item  ${selectedCuisine}`}
        </TextFormat>

        {isSearching && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearSearch();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition"
          >
            <span className="text-xl">×</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5 px-1 md:px-2">
        {foods.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="sm:w-[200px]  rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-red-200 transition flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full  max-sm:h-28   md:h-[150px] object-cover mb-1"
            />

            <div className="mb-2 px-2 gap-2 md:px-4 flex-1 flex flex-col">
              {/* Add flex-grow to push content down */}
              <div className="flex-grow">
                <TextFormat
                  as="p"
                  size="sm"
                  className="md:mt-1 sm:mt-0 text-left w-full text-gray-800 font-semibold"
                >
                  {item.title}
                </TextFormat>
              </div>

              {/* Add mt-auto to stick to bottom */}
              <div className="flex flex-col md:py-2 md:flex-row justify-between mt-auto">
                <div>
                  <p className="text-lg font-semibold text-red-500">
                    Rs.{item.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AddToCart
                    productId={item.id}
                    productName={item.title}
                    quantity={1}
                    onSuccess={() => setCartCount((prev) => prev + 1)}
                    className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:from-red-600 hover:to-rose-600 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    Add
                  </AddToCart>

                  <button
                    onClick={async (event) => {
                      event.stopPropagation();
                      if (addingToFavId) return;
                      setAddingToFavId(item.id);
                      try {
                        await AddToFav(item.id);
                        toast.success("Added to favorites!");
                        localStorage.setItem("quickbite_unseen_favs", "true");
                        setFavCount((prev) => prev + 1);
                      } catch (err) {
                        toast.error("Failed to add to favorites!");
                      } finally {
                        setAddingToFavId(null);
                      }
                    }}
                    disabled={addingToFavId === item.id}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-300 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularSection;
