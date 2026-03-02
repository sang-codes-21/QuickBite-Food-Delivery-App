import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopPart from "../components/layout/TopPart.jsx";
import Quantity from "../components/common/Quantity.jsx";
import OrderModal from "../components/order/OrderModal.jsx";
import {
  FetchCart,
  UpdateCartItemQuantity,
  RemoveCartItem,
  ClearCart,
  CreateOrder,
} from "../services/ServerAPI.js";
import { useAuth } from "../context/AuthContext.jsx";

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadCart() {
      setLoading(true);
      const data = await FetchCart(user?.id);
      setCartItems(data);
      setLoading(false);
    }
    loadCart();
  }, [user]);

  const handleQuantityChange = async (item, newQuantity) => {
    setCartItems((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, quantity: newQuantity } : c)),
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
      { items: 0, subtotal: 0 },
    );
  }, [cartItems]);

  const handleOrderSubmit = async (orderData) => {
    try {
      await CreateOrder({
        userId: user?.id,
        date: new Date().toLocaleDateString(),
        customerInfo: orderData,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          title: item.menuItem?.title || "Item",
          price: item.menuItem?.price || 0,
          image: item.menuItem?.image || "",
          restaurantChain: item.menuItem?.restaurantChain || "Quickbite",
        })),
        total: totals.subtotal,
        itemCount: totals.items,
      });

      // Clear cart from backend
      await ClearCart(user?.id);

      setCartItems([]);
      setIsModalOpen(false);
      localStorage.setItem("newOrderPlaced", "true");
      navigate("/order");
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  return (
    <>
      <TopPart />
      <main className="px-3 sm:px-4 py-4 sm:py-6 max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Your Cart
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <div className="bg-white border rounded-lg p-6 sm:p-8 text-center">
            <p className="text-3xl sm:text-4xl mb-3 sm:mb-4">🛒</p>
            <h2 className="text-base sm:text-lg font-semibold mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Add items to get started
            </p>
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-3 sm:p-4">
            {cartItems.map((item) => {
              const product = item.menuItem || {};
              const price = product.price ?? 0;
              const lineTotal = (price * item.quantity).toFixed(2);

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 border-b py-3 sm:py-4 last:border-b-0"
                >
                  {/* Image + Info row on mobile */}
                  <div className="flex gap-3 sm:gap-4 flex-1">
                    <img
                      src={product.image || "https://via.placeholder.com/80"}
                      alt={product.title}
                      className="h-16 w-16 sm:h-24 sm:w-24 rounded object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-sm sm:text-base truncate">
                        {product.title || "Item"}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        {product.restaurantChain || "Quickbite"}
                      </p>
                      <p className="font-semibold text-sm sm:text-base mt-1">
                        ${price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Controls: quantity, line total, remove */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                    <Quantity
                      value={item.quantity}
                      onChange={(newQty) => handleQuantityChange(item, newQty)}
                      disabled={updatingId === item.id}
                    />

                    <p className="font-semibold text-sm py-1 sm:text-base">
                      ${lineTotal}
                    </p>

                    <button
                      onClick={() => handleRemove(item)}
                      disabled={updatingId === item.id}
                      className="text-xs sm:text-sm md:text-base py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg text-white bg-red-600 hover:bg-red-700 active:scale-95 disabled:opacity-50 transition-all duration-150 whitespace-nowrap"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Subtotal */}
            <div className="flex justify-between items-center pt-3 sm:pt-4 border-t mt-3 sm:mt-4">
              <span className="font-semibold text-sm sm:text-base">
                Subtotal ({totals.items} item{totals.items !== 1 ? "s" : ""})
              </span>
              <span className="text-base sm:text-lg font-bold">
                ${totals.subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-3 sm:mt-4 bg-red-500 text-white py-2.5 sm:py-3 md:py-3.5 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-red-600 active:bg-red-700 active:scale-[0.98] transition-all duration-150"
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
