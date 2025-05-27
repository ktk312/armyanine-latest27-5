import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);

  // You can enhance this with session storage or cookies too.
  return token ? <Outlet /> : <Navigate to="/signin" replace/>;
};

export default ProtectedRoute;
