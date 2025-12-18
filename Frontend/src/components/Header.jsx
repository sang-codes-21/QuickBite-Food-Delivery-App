import React, { useState } from "react";
import logo from "../assets/quickbite.png";
import TextFormat from "./TextFormat.jsx";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Login from "../pages/LoginPage.jsx";

const Header = ({ cartCount, favCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  React.useEffect(() => {
    const raw = window.localStorage.getItem("quickbite_user");
    if (raw) {
      try {
        setCurrentUser(JSON.parse(raw));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("quickbite_user");
    setCurrentUser(null);
    setShowProfileDropdown(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-red-100 shadow-sm md:px-10 ">
        <div className="py-3 md:px-6 lg:px-10">
          <div className="flex justify-between items-center">
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

            <div className="hidden md:flex items-center gap-6">
              <Link to="/">
                <TextFormat
                  as="span"
                  size="xs"
                  className="inline-block w-[80px] text-gray-700 hover:text-red-500 transition-colors text-center"
                >
                  Home
                </TextFormat>
              </Link>

              <Link to="/cart" className="relative">
                <TextFormat
                  as="span"
                  size="xs"
                  className="inline-block w-[80px] text-gray-700 hover:text-red-500 transition-colors text-center"
                >
                  Cart 🛒
                </TextFormat>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/order">
                <TextFormat
                  as="span"
                  size="xs"
                  className="inline-block w-[80px] text-gray-700 hover:text-red-500 transition-colors text-center"
                >
                  Order
                </TextFormat>
              </Link>

              <Link to="/favourite" className="relative">
                <TextFormat
                  as="span"
                  size="xs"
                  className="inline-block w-[80px] text-gray-700 hover:text-red-500 transition-colors text-center"
                >
                  Favourites
                </TextFormat>
                {favCount > 0 && (
                  <span className="absolute  -right-1 w-2 h-1 rounded-full animate-bounce">
                    ❤️
                  </span>
                )}
              </Link>

              <div className="relative">
                <button
                  onClick={() => {
                    if (currentUser) {
                      setShowProfileDropdown(!showProfileDropdown);
                    } else {
                      setIsLoginOpen(true);
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 transition"
                >
                  <img
                    src={logo}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover shadow-sm"
                  />
                  <TextFormat
                    as="span"
                    size="xs"
                    className="inline-block text-gray-700"
                  >
                    {currentUser?.name || currentUser?.email || "Guest"}
                  </TextFormat>
                </button>

                {showProfileDropdown && currentUser && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {currentUser.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-3   bg-white shadow-lg border border-gray-100 px-3">
              <Link to="/">
                <TextFormat
                  as="p"
                  size="sm"
                  className="py-2 border-b border-gray-100 text-gray-700 hover:text-red-500 transition block"
                >
                  Home
                </TextFormat>
              </Link>

              <Link to="/cart">
                <TextFormat
                  as="p"
                  size="sm"
                  className="py-2 border-b border-gray-100 text-gray-700 hover:text-red-500 transition block"
                >
                  Cart
                </TextFormat>
              </Link>

              <Link to="/order">
                <TextFormat
                  as="p"
                  size="sm"
                  className="py-2 border-b border-gray-100 text-gray-700 hover:text-red-500 transition block"
                >
                  Order
                </TextFormat>
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginOpen(true);
                }}
                className="w-full text-left"
              >
                <TextFormat
                  as="p"
                  size="sm"
                  className="py-2 text-gray-700 hover:text-red-500 transition block"
                >
                  Profile
                </TextFormat>
              </button>
            </div>
          )}
        </div>
      </nav>
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Header;
