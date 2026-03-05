import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Edit2,
  ShoppingBag,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load user data into form on mount or when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full"
        >
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
            <User size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Please log in
          </h2>
          <p className="text-gray-500 mb-6">
            You need to be logged in to view and manage your profile.
          </p>
          <button
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-colors"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 pt-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row items-center gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative p-1.5 bg-orange-50 rounded-full"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f97316&color=fff&size=200`}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {user.name}
            </h1>
            <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2">
              <Mail size={14} /> {user.email}
            </p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full uppercase tracking-wider">
                Verified
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Navigation Menu */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Edit2 size={18} className="text-orange-500" /> My Portfolio
              </h3>
              <ul className="space-y-1">
                <li className="flex items-center p-3 rounded-2xl bg-orange-50 text-orange-600 font-medium cursor-pointer">
                  <User size={18} className="mr-3" />
                  Account Details
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                </li>
                <li
                  onClick={() => navigate("/order")}
                  className="flex items-center p-3 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <ShoppingBag size={18} className="mr-3" />
                  Order History
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                </li>
                <li
                  onClick={() => navigate("/favourite")}
                  className="flex items-center p-3 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Heart size={18} className="mr-3" />
                  My Favorites
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center p-3 mt-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Account Information Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
              {/* Form Header */}
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Account Information
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage your personal details and preferences
                  </p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                  >
                    <Edit2 size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <User size={11} /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      disabled={!isEditing}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm ${
                        !isEditing
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-800"
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <Mail size={11} /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm ${
                        !isEditing
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-800"
                      }`}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <Phone size={11} /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 890"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm ${
                        !isEditing
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-800"
                      }`}
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                      <MapPin size={11} /> Delivery Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      disabled={!isEditing}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your delivery address"
                      className={`w-full px-5 py-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-orange-400 transition-all text-sm ${
                        !isEditing
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-800"
                      }`}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="pt-2"
                    >
                      <button
                        type="submit"
                        className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 flex items-center gap-2"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Decorative BG Icon */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.04] text-orange-500 pointer-events-none">
                <User size={160} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
