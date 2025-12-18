import { useState, useEffect } from "react";
import { CheckCircle, Clock, Users } from "lucide-react";
import { getTodayActivity } from "./adminserver";

const TodaysActivity = () => {
  const [activity, setActivity] = useState({ ordersCompleted: 0, ordersPending: 0, newCustomers: 0 });

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activityData = await getTodayActivity();
        setActivity(activityData);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    fetchActivity();
  }, []);

  const { ordersCompleted, ordersPending, newCustomers } = activity;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Today's Activity</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Orders Completed</p>
              <p className="text-sm text-gray-600">Successfully delivered</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-green-600">{ordersCompleted}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Orders Pending</p>
              <p className="text-sm text-gray-600">Awaiting processing</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-yellow-600">{ordersPending}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">New Customers</p>
              <p className="text-sm text-gray-600">Registered today</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-blue-600">{newCustomers}</span>
        </div>
      </div>
    </div>
  );
};

export default TodaysActivity;
