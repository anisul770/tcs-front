import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Service from '../pages/Service';
import ServiceDetail from '../pages/ServiceDetail';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import ProfileSettings from '../pages/ProfileSettings';
import { Toaster } from 'react-hot-toast';
import BookingsList from '../pages/BookingsList';
import Cart from '../pages/Cart';
import RegisterPage from '../pages/RegisterPage';
import ActivateAccount from '../components/Registration/ActivateAccount'
import BookingDetails from '../components/Bookings/BookingDetails';
import AdminServiceManager from '../components/dashboard/AdminService';
import ForgotPassword from '../components/Profile/ForgotPassword';
import ResetPasswordConfirm from '../components/Profile/ResetPasswordConfirm';
import MyReviews from '../components/reviews/MyReviews';
import CustomersPage from '../components/dashboard/CustomersPage';
import CustomerDetailsPage from '../components/dashboard/CustomerDetailsPage';
import AllReviews from '../components/reviews/AllReviews';
import ManageCategories from '../components/dashboard/ManageCategories';

const AppRoutes = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='services' element={<Service />} />
          <Route path='services/:serviceId' element={<ServiceDetail />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='activate/:uid/:token/' element={<ActivateAccount />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='password/reset/confirm/:uid/:token/' element={<ResetPasswordConfirm />} />
        </Route>
        <Route path='dashboard' element={<PrivateRoute >
          <DashboardLayout />
        </PrivateRoute>} >
          <Route index element={<Dashboard />} />
          <Route path='profile' element={<ProfileSettings />} />
          <Route path='bookings' element={<BookingsList />} />
          <Route path='bookings/:id' element={<BookingDetails />} />
          <Route path='cart' element={<Cart />} />
          <Route path='admin/services' element={<AdminServiceManager />} />
          <Route path='admin/categories' element={<ManageCategories />} />
          <Route path='reviews' element={<MyReviews />} />
          <Route path='customers' element={<CustomersPage />} />
          <Route path='all-reviews' element={<AllReviews />} />
          <Route path='customers/details/:id' element={<CustomerDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;