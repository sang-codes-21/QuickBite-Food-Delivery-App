import { useState } from "react";
import { AddToCart as AddToCartAPI } from "../../services/ServerAPI.js";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import LoginPage from "../../pages/LoginPage.jsx";

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
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn, user } = useAuth();

  const handleAddToCart = async (event) => {
    if (event) {
      event.stopPropagation();
    }

    // If not logged in, show login modal
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }

    if (isAdding) return;

    setIsAdding(true);

    try {
      await AddToCartAPI(productId, quantity, user.id);

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
    <>
      <button
        onClick={handleAddToCart}
        disabled={disabled || isAdding}
        className={className}
      >
        {children}
      </button>
      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default AddToCart;
