import { useCallback, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  const [cart, setCart] = useState(null); // Changed to null as your API returns an object
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));

  const createOrGetCart = useCallback(async () => {
    try {
      const res = await authApiClient.post('/carts/', {});
      
      // FIX: Use res.data.id, not the old cartId variable
      if (!cartId) {
        localStorage.setItem("cartId", res.data.id);
        setCartId(res.data.id);
      }
      
      // Assuming your API returns an array, we take the first one
      setCart( res.data); 
      return { success: true };
    } catch (error) {
      console.error("Cart Error:", error.response);
      return { success: false, message: "Something Went Wrong" };
    }
  }, [cartId]);

  const updateItemQuantity = useCallback(async (quantity, id) => {
    if (!cartId) return { success: false, message: "No Cart ID" };

    try {
      const res = await authApiClient.put(
        `/carts/${cartId}/items/${id}/`, 
        { quantity: parseInt(quantity) }
      );
      
      if (res.status === 200) {
        // OPTIONAL: Refresh the cart data so the UI totals update
        await createOrGetCart(); 
        return { success: true };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data || "Something Went Wrong"
      };
    }
  }, [cartId, createOrGetCart]);

  return { cartId, cart, updateItemQuantity, createOrGetCart };
};

export default useCart;