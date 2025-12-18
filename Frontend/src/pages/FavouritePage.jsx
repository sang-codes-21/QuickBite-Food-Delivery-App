import React, { useEffect, useState } from "react";
import Tag from "../components/TextFormat.jsx";
import TopPart from "../components/TopPart.jsx";
import { FetchFavorites, RemoveFromFav } from "../ServerAPI.js";

const FavouritePage = () => {
  const [favItems, setFavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadFavorites() {
      localStorage.removeItem("quickbite_unseen_favs");
      setLoading(true);
      const data = await FetchFavorites();
      setFavItems(data);
      setLoading(false);
    }
    loadFavorites();
  }, []);

  const handleRemove = async (item) => {
    setFavItems((prev) => prev.filter((c) => c.id !== item.id));
    setUpdatingId(item.id);
    try {
      await RemoveFromFav(item.id); // Use the new server helper
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <TopPart />
      <main className="px-4 md:px-8 mt-6 md:mt-10">
        <div className="max-w-4xl mx-auto">
          <Tag
            as="h1"
            className="text-xl md:text-2xl font-semibold text-gray-900 mb-4"
          >
            Your Wishlist
          </Tag>

          {loading ? (
            <p className="text-gray-500">Loading your favorites...</p>
          ) : favItems.length === 0 ? (
            <div className="bg-white/95 rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-2xl">
                ❤️
              </div>
              <Tag as="h2" className="text-lg font-semibold text-gray-900 mt-1">
                Your wishlist is empty
              </Tag>
              <p className="text-sm text-gray-500 max-w-sm">
                Looks like you haven&apos;t added anything yet. Browse the menu
                and add your favorite dishes to get started.
              </p>
            </div>
          ) : (
            <div className="bg-white/95 rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 flex flex-col gap-4">
              {favItems.map((item) => {
                const product = item.menuItem || {};
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-shrink-0">
                        <img
                          src={
                            product.image || "https://via.placeholder.com/84"
                          }
                          alt={product.title}
                          className="h-20 w-20 md:h-24 md:w-24 rounded-xl object-cover shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Tag
                          as="h2"
                          className="font-semibold text-gray-900 line-clamp-2"
                        >
                          {product.title || "Item"}
                        </Tag>
                        <Tag
                          as="p"
                          size="xs"
                          className="text-gray-600 mt-1 line-clamp-1"
                        >
                          {product.restaurantChain || "Quickbite"}
                        </Tag>
                        <Tag
                          as="p"
                          size="sm"
                          className="text-gray-900 font-semibold mt-1"
                        >
                          ${product.price?.toFixed(2) ?? "0.00"}
                        </Tag>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(item)}
                      disabled={updatingId === item.id}
                      className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 disabled:opacity-50 transition self-start sm:self-auto"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default FavouritePage;
