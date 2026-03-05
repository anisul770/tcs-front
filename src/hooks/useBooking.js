import toast from "react-hot-toast";
import authApiClient from "../services/auth-api-client";
import { useCallback, useState } from "react";

const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // 1. Fetch all orders (History)
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await authApiClient.get("/orders/");
      setBookings(res.data);
    } catch (error) {
      console.error("Fetch Bookings Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Fetch a single order (Details)
  const fetchOrderDetails = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const res = await authApiClient.get(`/orders/${id}/`);
      setCurrentOrder(res.data);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data || "Could not load order details");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 3. Update Status (Admin)
  const updateOrderStatus = async (id, newStatus) => {
    setActionLoading(true);
    try {
      await authApiClient.patch(`/orders/${id}/update_status/`, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      const data = await fetchOrderDetails(id); 
      await fetchBookings(); 
      return { success: true, data: data };
    } catch (error) {
      return { success: false, msg: error.response?.data?.detail || "Update failed" };
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Cancel Order (User/Admin)
  const cancelBooking = async (id) => {
    if (!window.confirm("Confirm cancellation?")) return;
    setActionLoading(true);
    try {
      await authApiClient.post(`/orders/${id}/cancel/`, {});
      toast.success("Order cancelled");
      const res = await fetchOrderDetails(id);
      await fetchBookings();
      return { success: true, data: res };
    } catch (error) {
      return { success: false, msg: error.response?.data?.detail || "Cancellation failed" };
    } finally {
      setActionLoading(false);
    }
  };

  const bookingPayment = async (order) => {
    setActionLoading(true);
    try {
      const res = await authApiClient.post('/payment/initiate/', {
        amount: order.total_price,
        orderId: order.id,
        numItems: order.items?.length,
      });
      if (res.data.payment_url) {
        setActionLoading(false);
        window.location.href = res.data.payment_url;
        return {success:true};
      } else return {success:false , msg: 'Payment Failed' };
    } catch (error) {
      console.log(error.response)
      return {success:false, msg: error?.response?.data.error};
    } finally {
      setActionLoading(false);
    }
  };

  return {
    bookings,
    currentOrder,
    isLoading,
    actionLoading,
    fetchBookings,
    fetchOrderDetails,
    updateOrderStatus,
    cancelBooking,
    setCurrentOrder,
    bookingPayment,
  };
};

export default useBooking;