import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
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

const AppRoutes = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='shop/:serviceId' element={<ServiceDetail />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='activate/:uid/:token' element={<ActivateAccount />} />
        </Route>
        <Route path='dashboard' element={<PrivateRoute >
          <DashboardLayout />
        </PrivateRoute>} >
          <Route index element={<Dashboard />} />
          <Route path='profile' element={<ProfileSettings />} />
          <Route path='bookings' element={<BookingsList />} />
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;