import React from "react";

const Button = ({
  children,
  className = "",
  type = "button",
  size = "normal",
  onClick,
}) => {
  const sizes = {
    small: "px-3 py-1.5 text-xs sm:text-sm",
    normal: "px-4 py-2 text-sm sm:text-base",
    large: "px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg",
    quantity:
      "w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-lg",
  };
  return (
    <button
      type={type}
      className={`${sizes[size]} ${className} border border-2 rounded-lg`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
