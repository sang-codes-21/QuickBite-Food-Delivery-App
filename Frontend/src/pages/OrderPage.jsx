import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import TopPart from "../components/layout/TopPart.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { FetchUserOrders } from "../services/ServerAPI.js";

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered"];

const statusColors = {
  Pending: "bg-yellow-500",
  Processing: "bg-blue-500",
  Shipped: "bg-purple-500",
  Delivered: "bg-green-500",
};

const OrderTimeline = ({ currentStatus }) => {
  const currentIdx = STATUSES.indexOf(currentStatus);

  return (
    <div className="flex items-center w-full mt-4 mb-2">
      {STATUSES.map((status, idx) => {
        const isCompleted = idx <= currentIdx;
        const isLast = idx === STATUSES.length - 1;

        return (
          <div
            key={status}
            className={`flex items-center ${isLast ? "" : "flex-1"}`}
          >
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300 ${
                  isCompleted ? statusColors[status] : "bg-gray-300"
                }`}
              >
                {isCompleted ? "✓" : idx + 1}
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-1 font-medium ${
                  isCompleted ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {status}
              </span>
            </div>
            {/* Line */}
            {!isLast && (
              <div
                className={`flex-1 h-1 mx-1 rounded transition-all duration-300 ${
                  idx < currentIdx
                    ? statusColors[STATUSES[idx + 1]]
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const OrderPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const toastShown = useRef(false);

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      const data = await FetchUserOrders(user?.id);
      setOrders(data);
      setLoading(false);

      const isNewOrder = localStorage.getItem("newOrderPlaced");
      if (isNewOrder && !toastShown.current) {
        toast.success("Order Confirmed!");
        toastShown.current = true;
        localStorage.removeItem("newOrderPlaced");
      }
    }
    loadOrders();
  }, [user]);

  if (loading) {
    return (
      <>
        <TopPart />
        <main className="px-4 py-6 max-w-4xl mx-auto text-center">
          <p className="text-gray-500">Loading orders...</p>
        </main>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <TopPart />
        <main className="px-4 py-6 max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">📦</div>
          <h1 className="text-xl font-bold mb-2">No Orders Yet</h1>
          <p className="text-gray-600">
            You haven&apos;t placed any orders yet
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <TopPart />
      <main className="px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        {orders.map((order) => {
          const isExpanded = expandedId === order.id;

          return (
            <div
              key={order.id}
              className="bg-white border rounded-2xl shadow-sm mb-4 overflow-hidden transition-all"
            >
              {/* Order Summary Row */}
              <div className="p-4 sm:p-5 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="font-bold text-base">Order #{order.id}</h2>
                      <span
                        className={`text-xs font-semibold text-white px-2.5 py-0.5 rounded-full ${
                          statusColors[order.status] || "bg-gray-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {order.date} ·{" "}
                      <span className="font-semibold text-gray-800">
                        Rs.{(order.total || 0).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="text-sm font-semibold text-red-500 hover:text-red-600 border border-red-200 px-4 py-1.5 rounded-lg hover:bg-red-50 transition self-start sm:self-auto"
                  >
                    {isExpanded ? "Hide Details" : "More Details"}
                  </button>
                </div>

                {/* Item thumbnails preview */}
                <div className="flex flex-wrap gap-2">
                  {(order.items || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-8 w-8 rounded-md object-cover"
                      />
                      <span className="text-xs text-gray-700 font-medium">
                        {item.title}
                        {item.quantity > 1 && (
                          <span className="text-gray-400 ml-1">
                            ×{item.quantity}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t px-4 sm:px-5 pb-5 pt-3">
                  {/* Timeline */}
                  <OrderTimeline currentStatus={order.status} />

                  {/* Customer Info */}
                  <div className="mt-4 mb-4 pb-3 border-b space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {order.customerInfo?.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.customerInfo?.phone}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.customerInfo?.address}
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {order.customerInfo?.paymentMethod === "cash"
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-4">
                    {(order.items || []).map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-14 w-14 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {item.restaurantChain}
                          </p>
                          <p className="text-sm mt-0.5">
                            Rs.{item.price} × {item.quantity} ={" "}
                            <strong>Rs.{item.price * item.quantity}</strong>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-lg text-red-500">
                      Rs.{(order.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </main>
    </>
  );
};

export default OrderPage;
