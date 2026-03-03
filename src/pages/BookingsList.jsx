// src/pages/BookingsList.jsx
import { useState, useEffect } from "react";
// import useAuthContext from "../hooks/useAuthContext"; // Will need this later for API
// import { authApiClient } from "../api/authApiClient"; // Or wherever your custom client is

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Set to true when API is connected

  // Mock data for UI development
  const mockBookings = [
    { id: "BKG-001", date: "2023-10-25", service: "Deep Clean", status: "Confirmed", price: "$120" },
    { id: "BKG-002", date: "2023-11-02", service: "Standard Clean", status: "Pending", price: "$80" },
    { id: "BKG-003", date: "2023-09-15", service: "Move-Out Clean", status: "Done", price: "$200" },
  ];

  // Dummy effect to populate data immediately for testing the UI
  useEffect(() => {
    // eslint-disable-next-line
    setBookings(mockBookings);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return <span className="badge badge-success badge-sm font-medium">Confirmed</span>;
      case "Pending":
        return <span className="badge badge-warning badge-sm font-medium">Pending</span>;
      case "Done":
        return <span className="badge badge-ghost badge-sm font-medium">Done</span>;
      default:
        return <span className="badge badge-sm font-medium">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic text-base-content">My Bookings</h1>
          <p className="text-base-content/60">View and manage your upcoming and past cleaning appointments.</p>
        </div>
        <button className="btn btn-primary shadow-lg shadow-primary/20">Book New Service</button>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center items-center">
            <span className="loading loading-spinner text-primary loading-lg"></span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-lg font-bold">No bookings found</p>
            <p className="text-sm opacity-60 mt-2">You don't have any appointments scheduled yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>Booking ID</th>
                  <th>Date</th>
                  <th>Service Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover">
                    <td className="font-medium text-base-content">{booking.id}</td>
                    <td>{booking.date}</td>
                    <td>{booking.service}</td>
                    <td className="font-mono text-xs">{booking.price}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td className="text-right">
                      <button className="btn btn-ghost btn-xs">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;