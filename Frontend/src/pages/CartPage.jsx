import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopPart from "../components/TopPart.jsx";
import Quantity from "../components/Quantity.jsx";
import OrderModal from "../components/OrderModal.jsx";
import {
  FetchCart,
  UpdateCartItemQuantity,
  RemoveCartItem,
} from "../ServerAPI.js";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadCart() {
      setLoading(true);
      const data = await FetchCart();
      setCartItems(data);
      setLoading(false);
    }
    loadCart();
  }, []);

  const handleQuantityChange = async (item, newQuantity) => {
    setCartItems((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, quantity: newQuantity } : c))
    );
    setUpdatingId(item.id);
    try {
      await UpdateCartItemQuantity(item.id, newQuantity);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (item) => {
    setCartItems((prev) => prev.filter((c) => c.id !== item.id));
    setUpdatingId(item.id);
    try {
      await RemoveCartItem(item.id);
    } finally {
      setUpdatingId(null);
    }
  };

  const totals = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        const price = item.menuItem?.price ?? 0;
        acc.items += item.quantity;
        acc.subtotal += price * item.quantity;
        return acc;
      },
      { items: 0, subtotal: 0 }
    );
  }, [cartItems]);

  const handleOrderSubmit = (orderData) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      customerInfo: orderData,
      items: cartItems,
      totals: totals,
    };

    const existingOrders = localStorage.getItem("orderHistory");
    const orderHistory = existingOrders ? JSON.parse(existingOrders) : [];
    localStorage.setItem(
      "orderHistory",
      JSON.stringify([newOrder, ...orderHistory])
    );

    localStorage.setItem("newOrderPlaced", "true");

    setCartItems([]);
    setIsModalOpen(false);
    navigate("/order");
  };

  return (
    <>
      <TopPart />
      <main className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <div className="bg-white border rounded-lg p-8 text-center">
            <p className="text-4xl mb-4">🛒</p>
            <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600">Add items to get started</p>
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-4">
            {cartItems.map((item) => {
              const product = item.menuItem || {};
              const price = product.price ?? 0;
              const lineTotal = (price * item.quantity).toFixed(2);

              return (
                <div
                  key={item.id}
                  className="flex gap-4 border-b py-4 last:border-b-0"
                >
                  <img
                    src={product.image || "https://via.placeholder.com/80"}
                    alt={product.title}
                    className="h-20 w-20 rounded object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold">{product.title || "Item"}</h2>
                    <p className="text-sm text-gray-600">
                      {product.restaurantChain || "Quickbite"}
                    </p>
                    <p className="font-semibold mt-1">${price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Quantity
                      value={item.quantity}
                      onChange={(newQty) => handleQuantityChange(item, newQty)}
                      disabled={updatingId === item.id}
                    />

                    <p className="font-semibold">${lineTotal}</p>

                    <button
                      onClick={() => handleRemove(item)}
                      disabled={updatingId === item.id}
                      className="text-sm text-red-600 hover:underline disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between pt-4 border-t mt-4">
              <span className="font-semibold">
                Subtotal ({totals.items} item{totals.items !== 1 ? "s" : ""})
              </span>
              <span className="text-lg font-bold">
                ${totals.subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </main>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOrderSubmit}
      />
    </>
  );
};

export default CartPage;
