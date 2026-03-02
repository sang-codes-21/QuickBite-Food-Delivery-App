const Button = ({
  children,
  className = "",
  type = "button",
  size = "normal",
  onClick,
}) => {
  const sizes = {
    small: "px-3 py-1.5 text-xs sm:text-sm md:text-sm",
    normal: "px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base",
    large: "px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-base sm:text-lg",
    quantity:
      "w-8 h-8 sm:w-9 sm:h-9 bg-gray-200 rounded flex items-center justify-center text-base sm:text-lg",
  };
  return (
    <button
      type={type}
      className={`${sizes[size]} ${className} border border-2 rounded-lg active:scale-95 transition-all duration-150`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
