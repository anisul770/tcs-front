import { useContext } from 'react';
import BookingContext from '../context/BookingContext';

const useBookingContext = () => {
  return useContext(BookingContext);
};

export default useBookingContext;