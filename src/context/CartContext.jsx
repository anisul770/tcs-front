import { createContext } from "react";
import useCart from "../hooks/useCart";

const CartContext = createContext();

export const CartProvider = ({children}) => {
  const allContext = useCart();

  return <CartContext.Provider value={allContext}>{children}</CartContext.Provider>
}

export default CartContext;