import React from "react";
import { useNavigate } from "react-router-dom";
const TopPart = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="sticky top-0 bg-white/90 backdrop-blur-md z-30 h-16 flex items-center px-3 md:px-4 justify-between border-b border-gray-100 shadow-sm">
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="w-10 h-10 md:w-11 md:h-11 text-gray-700 flex items-center justify-center text-xl rounded-full border border-gray-200 hover:bg-gray-100 transition"
      >
        {"‹"}
      </button>

      <button
        onClick={handleClose}
        aria-label="Close"
        className="w-10 h-10 md:w-11 md:h-11 text-gray-700 flex items-center justify-center text-xl rounded-full border border-gray-200 hover:bg-gray-100 transition"
      >
        {"\u00D7"}
      </button>
    </div>
  );
};

export default TopPart;
