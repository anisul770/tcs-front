import { Route, Routes } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ServiceDetail from '../pages/ServiceDetail';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='shop/:serviceId' element={<ServiceDetail />} />
        <Route path='login' element={<LoginPage />} />
      </Route>
      <Route path='dashboard' element={<PrivateRoute >
        <DashboardLayout />
      </PrivateRoute>} >
        <Route index element={<Dashboard/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;