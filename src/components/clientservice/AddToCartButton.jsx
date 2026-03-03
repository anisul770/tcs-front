import { useState } from "react";
import useCartContext from "../../hooks/useCartContext";

const AddToCartButton = ({ serviceId, quantity = 1}) => {
  const { addCartItems } = useCartContext();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!serviceId) return; // Safety check
    
    setIsAdding(true);
    await addCartItems(serviceId, quantity);
    setIsAdding(false);
  };

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`btn btn-primary btn-sm rounded-lg`} 
    >
      {isAdding ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};

export default AddToCartButton;