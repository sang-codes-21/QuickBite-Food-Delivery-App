import { useState, useEffect } from "react";
import { TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";
import { getAdminStats } from "./adminserver";

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getAdminStats();
        
        setStats([
          { 
            icon: DollarSign, 
            label: "Total Revenue", 
            value: statsData.totalRevenue, 
            change: "+12.5%", 
            trend: "up",
            gradient: "from-[#c44569] to-[#7b2d42]"
          },
          { 
            icon: ShoppingCart, 
            label: "Total Orders", 
            value: statsData.totalOrders, 
            change: "+8.2%", 
            trend: "up",
            gradient: "from-[#eb3349] to-[#f45c43]"
          },
          { 
            icon: Users, 
            label: "Total Users", 
            value: statsData.totalUsers, 
            change: "+23.1%", 
            trend: "up",
            gradient: "from-[#ff416c] to-[#ff4b2b]"
          }
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats || stats.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-5 border-b-4 border-[#c44569] hover:-translate-y-2 transition-transform duration-300 hover:bg-[#c44569]/10">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
              <stat.icon className="text-white" size={20} />
            </div>
            
            <div className={`flex items-center gap-1 text-xs font-semibold ${
              stat.trend === "up" ? "text-green-600" : "text-red-600"
            }`}>
              <TrendingUp size={14} className={stat.trend === "down" ? "rotate-180" : ""} />
              {stat.change}
            </div>
          </div>
          
          <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
