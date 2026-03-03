import { useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import toast from "react-hot-toast";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";

const Cart = () => {
  const { cart, createOrGetCart, updateItemQuantity } = useCartContext();
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  useEffect(() => {
    createOrGetCart();
  }, [createOrGetCart]);

  const updateQuantity = async (id, delta) => {
    if (!localCart) return;

    // 1. Create a deep copy for rollback
    const copyCart = { ...localCart };
    
    // 2. Find the item to calculate new quantity
    const targetItem = localCart.items.find(i => i.id === id);
    if (!targetItem) return;
    
    const newQ = Math.max(1, targetItem.quantity + delta);
    if (newQ === targetItem.quantity) return; // No change

    // 3. Optimistic UI Update
    setLocalCart((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.id === id 
          ? { ...item, quantity: newQ, total_price: (item.service.price * newQ).toString() } 
          : item
      );
      return {
        ...prev,
        items: updatedItems,
        total_price: updatedItems.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toString(),
      };
    });

    try {
      // 4. API Call with the absolute new quantity
      await updateItemQuantity(newQ, id);
    } catch (error) {
      // 5. Rollback on failure
      setLocalCart(copyCart);
      toast.error(error.response?.data || 'Something Went Wrong');
    }
  };

  const subtotal = localCart?.items?.reduce((acc, item) => acc + (parseFloat(item.service.price) * item.quantity), 0) || 0;

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black italic text-base-content">Your Cart</h1>
        <p className="text-base-content/60">Review your services before finalizing your booking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartItems localCart={localCart} updateQuantity={updateQuantity}/>
        <CartSummary subtotal={subtotal}/>
      </div>
    </div>
  );
};

export default Cart;