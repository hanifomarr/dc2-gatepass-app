import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

const PublicRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  if (userInfo) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
