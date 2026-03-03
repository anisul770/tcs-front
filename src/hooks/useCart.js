import { useCallback, useState } from "react";
import authApiClient from "../services/auth-api-client";
import toast from "react-hot-toast";

const useCart = () => {
  const [cart, setCart] = useState(null); // Changed to null as your API returns an object
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  const createOrGetCart = useCallback(async () => {
    try {
      const res = await authApiClient.post('/carts/', {});

      // FIX: Use res.data.id, not the old cartId variable
      if (!cartId) {
        localStorage.setItem("cartId", res.data.id);
        setCartId(res.data.id);
      }

      // Assuming your API returns an array, we take the first one
      setCart(res.data);
      return { success: true };
    } catch (error) {
      console.error("Cart Error:", error.response);
      return { success: false, message: "Something Went Wrong" };
    }
  }, [cartId]);

  const addCartItems = useCallback(async (serviceId, quantity) => {
    setLoading(true);
    if (!cartId) await createOrGetCart();
    try {
      const res = await authApiClient.post(`/carts/${cartId}/items/`, { service: serviceId, quantity });
      console.log(res.data);
      await createOrGetCart();
      toast.success("Item added to cart!");
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Add to cart error:", error.response?.data);
      toast.error("Failed to add item");
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [cartId, createOrGetCart]);

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

  const removeItem = useCallback(async (id) => {
    if (!cartId) return;

    try {
      // 1. Make the delete call
      await authApiClient.delete(`/carts/${cartId}/items/${id}/`);

      // 2. Refresh the cart data so the "Grand Total" and "Items List" update
      await createOrGetCart();

      toast.success("Service removed from cart");
    } catch (error) {
      console.error("Remove Error:", error.response);
      toast.error("Could not remove item");
    }
  }, [cartId, createOrGetCart]);

  return { loading, cartId, cart, updateItemQuantity, createOrGetCart, addCartItems, removeItem, setCartId };
};

export default useCart;