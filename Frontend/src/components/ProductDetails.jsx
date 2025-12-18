import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchSingleFood } from "../ServerAPI.js";
import TopPart from "./TopPart.jsx";
import toast, { Toaster } from "react-hot-toast";
import Quantity from "./Quantity.jsx";
import AddToCart from "./AddToCart.jsx";

const ProductDetails = () => {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadFood() {
      setLoading(true);
      const data = await FetchSingleFood(id);
      setFood(data);
      setLoading(false);
    }
    loadFood();
  }, [id]);

  if (loading) {
    return (
      <>
        <TopPart />
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500">Loading details...</p>
        </div>
      </>
    );
  }

  if (!food) {
    return (
      <>
        <TopPart />
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">Product not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <TopPart />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-16">
     
          <div className="space-y-5">
            <div className=" bg-gray-50 rounded-3xl overflow-hidden shadow-sm">
              <img
                src={food.image}
                alt={food.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                
              />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {food.title}
              </h1>
              <span className="text-white inline-block text-md  bg-red-400 px-2 mt-2 rounded-full uppercase tracking-wider ">
                {food.restaurantChain || "Quickbite"}
              </span>
              <p className="text-2xl font-bold text-red-500 mt-4">

              Rs.{food.price}
              </p>
            </div>

            {/* Ingredients */}
            {food.ingredients?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {food.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {ing.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-6 border-t flex items-center gap-5 flex">
  <Quantity 
    value={quantity} 
    onChange={setQuantity}
  />

  <AddToCart
    productId={Number(id)}
    productName={food.title}
    quantity={quantity}
    className="px-4 py-1 bg-red-500 text-white 
    rounded-lg font-bold text-md shadow-lg shadow-red-200 
               hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition
              "
  >
    Add to Cart
  </AddToCart>
</div>

          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
