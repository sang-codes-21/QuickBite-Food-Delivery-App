import React from "react";
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
    <div className={`flex items-center gap-3 bg-gray-50 rounded-lg border px-3 py-1 text-gray-700 `}>
      <button
        onClick={handleDecrease}
        disabled={disabled || value <= 1}
        className="p-1  hover:bg-white hover:shadow-sm  rounded-full transition  "
      >
        <Minus size={16} />
      </button>
      
      <span className="w-6 text-center  font-bold ">{value}</span>
      
      <button
        onClick={handleIncrease}
        disabled={disabled}
        className="p-1 hover:bg-white hover:shadow-sm rounded-full transition  "
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default Quantity;

