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
      toast.error( error.response?.data || "Could not load order details");
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
      await fetchOrderDetails(id); // Refresh specific order
      await fetchBookings(); // Refresh list in background
    } catch (error) {
      toast.error(error.response?.data?.detail || "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Cancel Order (User/Admin)
  const handleCancel = async (id) => {
    if (!window.confirm("Confirm cancellation?")) return;
    setActionLoading(true);
    try {
      await authApiClient.post(`/orders/${id}/cancel/`, {});
      toast.success("Order cancelled");
      await fetchOrderDetails(id);
      await fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Cancellation failed");
    } finally {
      setActionLoading(false);
    }
  };

  return { bookings,
      currentOrder,
      isLoading,
      actionLoading,
      fetchBookings,
      fetchOrderDetails,
      updateOrderStatus,
      handleCancel,
      setCurrentOrder};
};

export default useBooking;