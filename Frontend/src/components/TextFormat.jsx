import React from "react";

const TextFormat = ({ children, className = "", size = "md", as = "p" }) => {
  const sizes = {
    xs: "text-xs sm:text-sm md:text-base lg:text-base",
    sm: "text-sm sm:text-base md:text-lg lg:text-xl",
    md: "text-base sm:text-lg md:text-xl lg:text-2xl",
    lg: "text-lg sm:text-xl md:text-2xl lg:text-3xl",
    xl: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    "2xl": "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    "3xl": "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
  };
  const Tag = as;
  return <Tag className={`${sizes[size]} ${className}`}>{children}</Tag>;
};

export default TextFormat;
