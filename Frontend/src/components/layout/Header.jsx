import React, { useState } from "react";
import logo from "../../assets/quickbite.png";
import TextFormat from "../constant/TextFormat.jsx";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Login from "../../pages/LoginPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const Header = ({ cartCount = 0, favCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { user: currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-red-100 shadow-sm">
        <div className="px-4 md:px-10 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex gap-3 items-center">
              <img
                src={logo}
                alt="Quickbite Logo"
                className="h-10 w-10 md:h-12 md:w-12 rounded-xl shadow-sm"
              />
              <TextFormat as="h1" size="md" className="font-bold">
                Quickbite
              </TextFormat>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/">
                <TextFormat
                  size="xs"
                  className="w-[80px] text-center hover:text-red-500"
                >
                  Home
                </TextFormat>
              </Link>

              <Link to="/cart" className="relative">
                <TextFormat
                  size="xs"
                  className="w-[80px] text-center hover:text-red-500"
                >
                  Cart 🛒
                </TextFormat>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/order">
                <TextFormat
                  size="xs"
                  className="w-[80px] text-center hover:text-red-500"
                >
                  Order
                </TextFormat>
              </Link>

              <Link to="/favourite" className="relative">
                <TextFormat
                  size="xs"
                  className="w-[80px] text-center hover:text-red-500"
                >
                  Favourites
                </TextFormat>
                {favCount > 0 && <span className="absolute -right-1">❤️</span>}
              </Link>

              {/* Profile / Login */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown((prev) => !prev)}
                    className="w-9 h-9 rounded-full  text-white flex items-center justify-center text-sm font-bold uppercase bg-red-600 transition"
                    title={currentUser.name}
                  >
                    {currentUser.name?.charAt(0) || "U"}
                  </button>

                  {/* Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-50 transition"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="hover:text-red-500 transition"
                >
                  <TextFormat
                    size="xs"
                    className="w-[80px] text-center text-red-500 hover:text-red-600 font-bold"
                  >
                    Login
                  </TextFormat>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-2 pb-3 flex flex-col gap-1 border-t border-red-100 pt-3">
              <Link
                to="/"
                className="px-3 py-2 rounded-lg hover:bg-red-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <TextFormat size="xs" className="hover:text-red-500">
                  Home
                </TextFormat>
              </Link>

              <Link
                to="/cart"
                className="px-3 py-2 rounded-lg hover:bg-red-50 transition flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <TextFormat size="xs" className="hover:text-red-500">
                  Cart 🛒
                </TextFormat>
                {cartCount > 0 && (
                  <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/order"
                className="px-3 py-2 rounded-lg hover:bg-red-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <TextFormat size="xs" className="hover:text-red-500">
                  Order
                </TextFormat>
              </Link>

              <Link
                to="/favourite"
                className="px-3 py-2 rounded-lg hover:bg-red-50 transition flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <TextFormat size="xs" className="hover:text-red-500">
                  Favourites
                </TextFormat>
                {favCount > 0 && <span>❤️</span>}
              </Link>

              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    className="px-3 py-2 rounded-lg hover:bg-red-50 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TextFormat size="xs" className="hover:text-red-500">
                      Profile
                    </TextFormat>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-2 rounded-lg text-left hover:bg-red-50 transition"
                  >
                    <TextFormat size="xs" className="text-red-600">
                      Logout
                    </TextFormat>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg text-left hover:bg-red-50 transition"
                >
                  <TextFormat size="sm" className="text-red-500 font-semibold">
                    Login
                  </TextFormat>
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Header;
