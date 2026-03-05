import { useCallback, useState } from "react";
import authApiClient from "../services/auth-api-client";
import toast from "react-hot-toast";

const useCart = () => {
  const [cart, setCart] = useState(null); 
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  const createOrGetCart = useCallback(async () => {
    if(!localStorage.getItem('authTokens')) return;
    try {
      const res = await authApiClient.post('/carts/', {});

      if (!cartId) {
        localStorage.setItem("cartId", res.data.id);
        setCartId(res.data.id);
      }
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
      await authApiClient.delete(`/carts/${cartId}/items/${id}/`);

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