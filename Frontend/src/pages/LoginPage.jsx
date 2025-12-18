import TextFormat from "../components/TextFormat.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../ServerAPI.js";
const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();
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
      window.localStorage.setItem("quickbite_user", JSON.stringify(user));
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
    <div className="flex inset-0 inset justify-center">
      <div className="w-96 p-6 top-56 border z-50 left-1/2 -translate-x-1/2 bg-white fixed flex flex-col border-gray-300 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <TextFormat
              as="h2"
              size="lg"
              className="text-red-600 font-bold mb-4 text-center"
            >
              Login
            </TextFormat>
          </div>
          <div>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="w-10 h-10 text-red-500 flex items-center justify-center text-2xl hover:bg-gray-100 rounded"
            >
              {"\u00D7"}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="flex flex-col mb-4">
            <TextFormat as="p" size="sm" className="text-red-600 mb-2">
              Email
            </TextFormat>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="p-2 w-full rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>

          <label className="flex flex-col mb-4">
            <TextFormat as="p" size="sm" className="text-red-600 mb-2">
              Password
            </TextFormat>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-2 w-full rounded-md text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-60 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="flex justify-center items-center gap-2">
            <TextFormat
              as="p"
              size="xs"
              className="text-center text-gray-600 mt-4"
            >
              Don't have an account?{" "}
            </TextFormat>
            <button
              type="button"
              onClick={() => navigate("/SignUp")}
              className="text-red-600 hover:underline mt-4"
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
