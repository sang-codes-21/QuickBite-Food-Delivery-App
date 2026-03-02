import { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  ChevronDown,
} from "lucide-react";
import { FetchAllOrders, UpdateOrderStatus } from "../../services/ServerAPI.js";

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered"];

const getStatusColor = (status) => {
  if (status === "Delivered") return "text-green-600 bg-green-50";
  if (status === "Pending") return "text-yellow-600 bg-yellow-50";
  if (status === "Processing") return "text-blue-600 bg-blue-50";
  if (status === "Shipped") return "text-purple-600 bg-purple-50";
  return "text-gray-600 bg-gray-50";
};

const getStatusIcon = (status) => {
  if (status === "Delivered") return CheckCircle;
  if (status === "Pending") return Clock;
  if (status === "Processing") return Package;
  if (status === "Shipped") return Truck;
  return XCircle;
};

const RecentOrders = ({ searchQuery }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const ordersData = await FetchAllOrders();
      setAllOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setFilteredOrders(allOrders);
    } else {
      const q = searchQuery.toLowerCase();
      const filtered = allOrders.filter(
        (order) =>
          String(order.id).toLowerCase().includes(q) ||
          (order.customerInfo?.name || "").toLowerCase().includes(q) ||
          (order.status || "").toLowerCase().includes(q),
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, allOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await UpdateOrderStatus(orderId, newStatus);
      setAllOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
      <div className="mb-5 border-b border-gray-200 pb-2">
        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Items
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                const itemNames =
                  order.items?.map((i) => i.title).join(", ") || "—";

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-[#c44569]">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {order.customerInfo?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[150px] truncate">
                      {itemNames}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      Rs.{(order.total || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                      >
                        <StatusIcon size={12} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {order.date || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <select
                          value={order.status}
                          disabled={
                            updatingId === order.id ||
                            order.status === "Delivered"
                          }
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 pr-7 bg-white focus:outline-none focus:ring-2 focus:ring-[#c44569] disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  {searchQuery
                    ? `No orders found matching "${searchQuery}"`
                    : "No orders available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
