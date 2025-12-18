import React from "react";
import { useNavigate } from "react-router-dom";
import TextFormat from "../components/TextFormat.jsx";
import { SignUpUser } from "../ServerAPI.js";

const SignUp = ({ onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await SignUpUser({ name, email, password });
      window.localStorage.setItem("quickbite_user", JSON.stringify(user));
      if (onClose) {
        onClose();
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      onClick={handleClose}
    >
      <div
        className="w-96 p-6 bg-white flex flex-col border border-gray-300 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
        >
          ×
        </button>

        <TextFormat
          as="h2"
          size="lg"
          className="text-red-600 font-bold mb-4 text-center"
        >
          Sign Up
        </TextFormat>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="flex flex-col mb-4">
            <TextFormat as="p" size="sm" className="text-red-600 mb-2">
              Name
            </TextFormat>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="p-2 w-full rounded-md text-black border border-gray-300"
            />
          </label>

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
              className="p-2 w-full rounded-md text-black border border-gray-300"
            />
          </label>

          <label className="flex flex-col mb-2">
            <TextFormat as="p" size="sm" className="text-red-600 mb-2">
              Password
            </TextFormat>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-2 w-full rounded-md text-black border border-gray-300"
            />
          </label>

          {error && (
            <p className="text-xs text-red-500 mt-1 mb-1 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-60 transition"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
