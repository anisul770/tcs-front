import { createContext } from "react";
import useBooking from "../hooks/useBooking";

const BookingContext = createContext();

export const BookingProvider = ({children}) => {
  const allContext = useBooking();
  return <BookingContext.Provider value={allContext}>{children}</BookingContext.Provider>
}

export default BookingContext;