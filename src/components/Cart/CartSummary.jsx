const CartSummary = ({subtotal}) => {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm p-6 h-fit">
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
      <button className="btn btn-primary btn-block shadow-lg shadow-primary/20">
        Proceed to Payment
      </button>
    </div>
  );
};

export default CartSummary;