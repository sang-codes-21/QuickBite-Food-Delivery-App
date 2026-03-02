import TextFormat from "../components/constant/TextFormat.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../services/ServerAPI.js";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await LoginUser(email, password);
      if (!user) {
        setError("Invalid email or password");
        return;
      }
      // Use AuthContext login to update state globally
      login(user);
      if (onClose) {
        onClose();
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20  px-4">
      <div className="w-full max-w-sm p-5 sm:p-6 bg-white flex flex-col border border-gray-200 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div>
            <TextFormat
              as="h2"
              size="lg"
              className="text-red-600 font-bold text-center"
            >
              Login
            </TextFormat>
          </div>
          <div>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="w-9 h-9 sm:w-10 sm:h-10 text-red-500 flex items-center justify-center text-xl sm:text-2xl hover:bg-gray-100 rounded-full transition"
            >
              {"\u00D7"}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="flex flex-col mb-3 sm:mb-4">
            <TextFormat
              as="p"
              size="sm"
              className="text-red-600 mb-1.5 sm:mb-2"
            >
              Email
            </TextFormat>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="p-2 sm:p-2.5 w-full rounded-lg text-black text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </label>

          <label className="flex flex-col mb-3 sm:mb-4">
            <TextFormat
              as="p"
              size="sm"
              className="text-red-600 mb-1.5 sm:mb-2"
            >
              Password
            </TextFormat>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-2 sm:p-2.5 w-full rounded-lg text-black text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 sm:mt-2 bg-red-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 active:scale-[0.98] disabled:opacity-60 transition-all duration-150"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            <TextFormat as="p" size="xs" className="text-center text-gray-600">
              Don't have an account?{" "}
            </TextFormat>
            <button
              type="button"
              onClick={() => navigate("/SignUp")}
              className="text-sm text-red-600 font-medium hover:underline"
            >
              Sign up
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
