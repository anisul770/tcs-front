import { useState } from "react";
import useCartContext from "../../hooks/useCartContext";
import authApiClient from "../../services/auth-api-client";
import toast from "react-hot-toast";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const CartSummary = ({ subtotal, setLocalCart }) => {
  const { cartId, setCartId } = useCartContext();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  // const [local]

  const createBooking = async () => {
    setLoading(true);
    try {
      await authApiClient.post('/orders/', { cart_id: cartId });
      localStorage.removeItem('cartId');
      setLocalCart(null);
      setCartId(null);
      toast.success('Booking Created');
      setCreated(true);
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 border border-base-300 sticky top-0 shadow-sm p-6 h-fit">
      <h3 className="font-black text-lg mb-4 italic">Summary</h3>
      <div className="space-y-2 pb-4 border-b border-base-200 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between opacity-60">
          <span>VAT (included)</span>
          <span>€{(subtotal * 0.13).toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between font-black text-xl py-4">
        <span>Total</span>
        <span className="text-primary">€{subtotal.toFixed(2)}</span>
      </div>
      <button
        disabled={loading || created} // Prevent clicking during loading OR after success
        onClick={() => createBooking()}
        className={`btn btn-block shadow-lg transition-all duration-300 ${created
          ? "btn-success text-success-content shadow-success/20"
          : "btn-primary shadow-primary/20"
          }`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Processing...</span>
          </>
        ) : created ? (
          <>
            <Check size={18} />
            <span>Booking Confirmed</span>
          </>
        ) : (
          <>
            <span>Proceed to Booking</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
};

export default CartSummary;