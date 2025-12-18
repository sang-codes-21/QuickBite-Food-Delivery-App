import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, Package } from "lucide-react";
import { getRecentOrders } from "./adminserver";

const getStatusColor = (status) => {
  if (status === "completed") return "text-green-600 bg-green-50";
  if (status === "pending") return "text-yellow-600 bg-yellow-50";
  if (status === "cancelled") return "text-red-600 bg-red-50";
  return "text-gray-600 bg-gray-50";
};

const getStatusIcon = (status) => {
  if (status === "completed") return CheckCircle;
  if (status === "pending") return Clock;
  if (status === "cancelled") return XCircle;
  return Package;
};

const RecentOrders = ({ searchQuery }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getRecentOrders();
        setAllOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredOrders(allOrders);
    } else {
      const filtered = allOrders.filter(order => 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchQuery, allOrders]);

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
      <div className="mb-5 border-b border-gray-200 pb-2">
        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Items</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, idx) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-[#c44569]">{order.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.items}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        <StatusIcon size={12} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.time}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  {searchQuery ? `No orders found matching "${searchQuery}"` : 'No orders available'}
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
