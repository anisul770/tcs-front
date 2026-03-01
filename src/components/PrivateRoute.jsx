import { Navigate, useLocation } from 'react-router';
import useAuthContext from '../hooks/useAuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  // 1. Wait for the Auth hook to finish checking the token
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. If no user is found after loading, redirect to login
  // We pass the current location to "state" so we can redirect back after login
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;

};

export default PrivateRoute;