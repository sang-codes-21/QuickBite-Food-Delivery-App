import React, { useState } from "react";
import { AddToCart as AddToCartAPI } from "../ServerAPI.js";
import toast from "react-hot-toast";


const AddToCart = ({
  productId,
  productName,
  quantity = 1,
  onSuccess,
  onError,
  className = "",
  children = "Add",
  disabled = false,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (event) => {
    if (event) {
      event.stopPropagation();
    }

    if (isAdding) return;

    setIsAdding(true);

    try {
      await AddToCartAPI(productId, quantity);
      
      const quantityText = quantity > 1 ? `${quantity}x` : "";
      toast.success(`${quantityText} ${productName} added to cart!`, {
        duration: 2000,
        
      });

      if (onSuccess) {
        onSuccess(quantity);
      }
    } catch (err) {
      toast.error("Failed to add item to cart!", {
        duration: 2000,
      });

      if (onError) {
        onError(err);
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      className={className}
    >
      { children}
    </button>
  );
};

export default AddToCart;
