import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import TopPart from "../components/TopPart.jsx";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const toastShown = useRef(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem("orderHistory");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));

      const isNewOrder = localStorage.getItem("newOrderPlaced");
      if (isNewOrder && !toastShown.current) {
        toast.success("Order Confirmed!");
        toastShown.current = true;

        localStorage.removeItem("newOrderPlaced");
      }
    }
  }, []);

  if (orders.length === 0) {
    return (
      <>
        <TopPart />
        <main className="px-4 py-6 max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">📦</div>
          <h1 className="text-xl font-bold mb-2">No Orders Yet</h1>
          <p className="text-gray-600">You haven't placed any orders yet</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <TopPart />
      <main className="px-4 py-6 max-w-4xl mx-auto">
        <div className="flex justify-between items mb-2 p-2 ">
          <h1 className="text-2xl font-bold mb-6">Your Recent Orders</h1>
          <button
            onClick={() => {
              localStorage.removeItem("orderHistory");
              setOrders([]);
              toast.success("Order history cleared");
            }}
            className="px-4 py-1 bg-red-500 text-white rounded-lg text-sm"
          >
            Clear History
          </button>
        </div>
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-2xl shadow-lg p-6 mb-4"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b">
              <h2 className="font-bold text-lg">Order #{order.id}</h2>
              {order.date && (
                <span className="text-sm text-gray-600">{order.date}</span>
              )}
            </div>

            {/* Customer Info */}
            <div className="mb-4 pb-3 border-b space-y-1 text-sm">
              <p>
                <strong>Name:</strong> {order.customerInfo.name}
              </p>
              <p>
                <strong>Phone:</strong> {order.customerInfo.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.customerInfo.address}
              </p>
              <p>
                <strong>Payment:</strong>{" "}
                {order.customerInfo.paymentMethod === "cash"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {order.items.map((item) => {
                const product = item.menuItem || {};
                return (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {product.title || "Item"}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {product.restaurantChain || "Quickbite"}
                      </p>
                      <p className="text-sm mt-1">
                        Rs.{product.price || 0} × {item.quantity} ={" "}
                        <strong>
                          Rs.{(product.price || 0) * item.quantity}
                        </strong>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Total */}
            <div className="flex justify-between pt-3 border-t">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg text-red-500">
                Rs.{order.totals.subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default OrderPage;
