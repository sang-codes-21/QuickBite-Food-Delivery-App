import { Minus, Plus } from "lucide-react";

const Quantity = ({ value, onChange, disabled = false }) => {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div
      className={`flex items-center gap-1  bg-gray-50 rounded-lg border px-1 sm:px-1.5 py-1 sm:py-1.5 text-gray-700`}
    >
      <button
        onClick={handleDecrease}
        disabled={disabled || value <= 1}
        className="p-1.5 sm:p-1 hover:bg-white hover:shadow-sm active:scale-90 rounded-full transition-all duration-150 disabled:opacity-40"
      >
        <Minus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
      </button>

      <span className="w-5 sm:w-6 text-center text-sm sm:text-base font-bold">
        {value}
      </span>

      <button
        onClick={handleIncrease}
        disabled={disabled}
        className="p-1.5 sm:p-1 hover:bg-white hover:shadow-sm active:scale-90 rounded-full transition-all duration-150 disabled:opacity-40"
      >
        <Plus className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};

export default Quantity;
