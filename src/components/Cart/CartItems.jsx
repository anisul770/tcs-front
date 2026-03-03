import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";

const CartItems = ({localCart,updateQuantity,removeItem}) => {
  return (
    <div className="lg:col-span-2 space-y-4">
      {localCart?.items && localCart.items.length > 0 ? (
        localCart.items.map((item) => (
          <div key={item.id} className="card bg-base-100 border border-base-300 shadow-sm p-6 flex-row items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.service.name}</h3>
              <p className="text-sm opacity-60 mb-3">{item.service.category.name}</p>

              <div className="flex items-center gap-4">
                <div className="join border border-base-300">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="btn btn-ghost btn-xs join-item px-2"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="join-item px-4 flex items-center bg-base-200 text-xs font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="btn btn-ghost btn-xs join-item px-2"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={()=> removeItem(item.id)}
                 className="btn btn-ghost btn-xs text-error gap-1 hover:bg-error/10">
                  <Trash2 size={14} />
                  <span className="hidden sm:inline">Remove</span>
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-black text-primary">
                €{(parseFloat(item.service.price) * item.quantity).toFixed(2)}
              </div>
              {item.quantity > 1 && (
                <div className="text-[10px] opacity-40 font-bold uppercase italic">
                  €{item.service.price} each
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="card bg-base-100 border border-base-300 p-12 text-center">
          <p className="opacity-60 mb-4">Your cart is empty.</p>
          <Link to="/services" className="btn btn-primary btn-wide mx-auto">Browse Services</Link>
        </div>
      )}
    </div>
  );
};

export default CartItems;