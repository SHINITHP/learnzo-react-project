import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { type RootState } from "@/redux/store";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
