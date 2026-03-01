import StaffMain from "../components/dashboard/StaffMain";
import UserMain from "../components/dashboard/UserMain";
import useAuthContext from "../hooks/useAuthContext";

const Dashboard = () => {
  const {user} = useAuthContext();
  return user.is_staff ? <StaffMain/> : <UserMain/>;
};

export default Dashboard;